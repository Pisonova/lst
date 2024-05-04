from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
from django.contrib.auth.models import User
import jwt
from django.conf import settings
from .models import *
from datetime import datetime, timedelta
from django.utils import timezone

def check_login(token):
    if token != None:
        username = jwt.decode(token, key=settings.SECRET_KEY, algorithms="HS256")
        return username
    return token

@csrf_exempt
def login(req):
    body = json.loads(req.body)
    name, password = body["username"], body["password"]
    users = User.objects.filter(username=name)

    if users.count() == 0:
        return JsonResponse({"message": "Nesprávne meno"}, status=401)

    user = users.first()

    if not user.check_password(raw_password=password):
        return JsonResponse({"message": "Nesprávne heslo"}, status=401)

    token = jwt.encode({"name": name}, key=settings.SECRET_KEY, algorithm="HS256")
    return JsonResponse({"token": token})
    
@csrf_exempt
def register(req):
    body = json.loads(req.body)
    first_name, surname, email = body["first_name"], body["surname"], body["email"]
    username, password = body["username"], body["password"]

    users = User.objects.filter(username=username)

    if users.count() > 0:
        return JsonResponse({"message": "Toto používateľské meno je už obsadené"}, status=401)

    try:
        new_user = User.objects.create(
            username=username, 
            first_name=first_name,
            last_name=surname,
            email=email,
        )
        new_user.set_password(password)
    except:
        return JsonResponse({"message": "Nepodarilo sa vytvoriť účet"}, status=401)
    
    new_user.save()

    custom_user = CustomUser.objects.create(user=new_user)
    custom_user.save()

    token = jwt.encode({"name": username}, key=settings.SECRET_KEY, algorithm="HS256")
    return JsonResponse({"token": token})

@csrf_exempt
def load(req):
    events = Event.objects.filter(visible=True)
    return JsonResponse(list(events.values()), safe=False)

@csrf_exempt
def get_event(req, id):
    event = Event.objects.filter(id=id)
    ads = event.first().accomodation_dates.all()
    values = list(event.values())
    values[0]["accomodation_dates"] = list(event.first().accomodation_dates.all().values())
    return JsonResponse(values, safe=False)

@csrf_exempt
def register_event(req):
    body = json.loads(req.body)
    token, event_id = body["token"], body["event_id"]
    lunches, accomodation = body["lunches"], body["accomodation"]

    username = check_login(token)
    user = User.objects.get(username=username["name"])
    customUser = CustomUser.objects.get(user=user)
    event = Event.objects.get(id=event_id)
    try:
        Event_registration.objects.get(user=customUser, event=event)
        return JsonResponse({"message": "Na túto akciu už ste zaregistrovaný"}, status=401)
    except:
        pass
    try:
        ereg = Event_registration.objects.create(
            user=customUser,
            event=event,
            lunches=int(lunches),
        )
    except Exception as error:
        return JsonResponse({"message": "Nepodarilo sa zaregistrovať na akciu"}, status=401)

    ereg.save()

    return JsonResponse({})
