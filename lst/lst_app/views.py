from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
from django.contrib.auth.models import User
import jwt
from django.conf import settings
from .models import *


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
        return JsonResponse({"message": "Nepodarilo sa vytvoriť účet"})
    
    new_user.save()

    custom_user = CustomUser.objects.create(user=new_user)
    custom_user.save()

    token = jwt.encode({"name": username}, key=settings.SECRET_KEY, algorithm="HS256")
    return JsonResponse({"token": token})

@csrf_exempt
def load(req):
    events = Event.objects.filter(visible=True)
    return JsonResponse(list(events.values()), safe=False)
