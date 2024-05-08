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
    roles = CustomUser.objects.get(user=user).roles.all()
    print(len(roles)>0)
    return JsonResponse({"token": token, "org":(len(roles)>0)})
    
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
    username = None
    try:
        token = req.GET["token"]
        username = check_login(token)
    except:
        pass
    events = Event.objects.filter(visible=True).filter(end__range=[datetime.now(), datetime.now()+timedelta(days=10000)])
    registrations = []

    if username:
        user = User.objects.get(username=username["name"])
        cUser = CustomUser.objects.get(user=user)
        for event in events:
            if Event_registration.objects.filter(user=cUser, event=event):
                registrations.append(True)
            else:
                registrations.append(False)
    if len(registrations) == 0:
        registrations = [False for event in events]
    res = list(events.values())
    for i in range(len(res)):
        res[i]["registered"] = registrations[i]
    return JsonResponse(res, safe=False)

@csrf_exempt
def load_old(req):
    events = Event.objects.filter(visible=True).filter(end__range=[datetime.now()-timedelta(days=100000), datetime.now()])
    registrations = []
    if len(registrations) == 0:
        registrations = [False for event in events]
    res = list(events.values())
    for i in range(len(res)):
        res[i]["registered"] = registrations[i]
    return JsonResponse(res, safe=False)

@csrf_exempt
def load_my_events(req):
    username = None
    try:
        token = req.GET["token"]
        username = check_login(token)
    except:
        return JsonResponse({"message": "Nie ste prihlásený"}, status=401)
    events = Event.objects.filter(visible=True)
    registrations = []

    if username:
        user = User.objects.get(username=username["name"])
        cUser = CustomUser.objects.get(user=user)
        for event in events:
            if Event_registration.objects.filter(user=cUser, event=event):
                registrations.append(True)
            else:
                registrations.append(False)
    if len(registrations) == 0:
        registrations = [False for event in events]
    res = list(events.values())
    myevents = []
    for i in range(len(res)):
        if registrations[i]:
            res[i]["registered"] = registrations[i]
            myevents.append(res[i])
    return JsonResponse(myevents, safe=False)

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
    lunches, accomodations = body["lunches"], body["accomodations"]

    try:
        username = check_login(token)
        user = User.objects.get(username=username["name"])
        cUser = CustomUser.objects.get(user=user)
        event = Event.objects.get(id=event_id)
        accs = event.accomodation_dates.all()
        Event_registration.objects.get(user=cUser, event=event)
        return JsonResponse({"message": "Na túto akciu už ste zaregistrovaný"}, status=401)
    except:
        pass

    try:
        ereg = Event_registration.objects.create(
            user=cUser,
            event=event,
            lunches=int(lunches),
        )
        accomodation_dates = []
        for i in range(len(accomodations)):
            if accomodations[i]:
                ereg.accomodation_dates.add(accs[i])

        if len(cUser.roles.all()) > 0:
            print("tuuu")
            roleType = Role_type.objects.get(name="org")
            role = Role.objects.filter(role_type=roleType, event=event)
            print("here.")
            if len(role) == 0:
                role = Role.objects.create(
                    role_type=roleType,
                    event=event,
                )
                role.save()
                print("here?")
            else:
                role = role[0]
            cUser.roles.add(role)

    except Exception as error:
        return JsonResponse({"message": "Nepodarilo sa zaregistrovať na akciu"}, status=401)

    ereg.save()

    return JsonResponse({})

@csrf_exempt
def add_feedback(req):
    body = json.loads(req.body)
    token, aType, id = body["token"], body["type"], body["id"]
    points, feedback = body["points"], body["feedback"]
    try:
        fb = Feedback.objects.create(
            points=points
        )
        if aType == 'program':
            program = Program.objects.get(id=id)
            fb.program=program
        else:
            event = Event.objects.get(id=id)
            fb.event = event
        if feedback != "":
            fb.comment = feedback
        if token != "":
            username = check_login(token)["name"]
            user = User.objects.get(username=username)
            cUser = CustomUser.objects.get(user=user)
            fb.user = cUser
    except:
        return JsonResponse({"message": "Nepodarilo sa pridať feedback"}, status=401)
    fb.save()
    return JsonResponse({})

@csrf_exempt
def get_action(req, type, id):
    try:
        action = Program.objects.filter(id=id) if type == 'program' else Event.objects.filter(id=id)
    except:
        return JsonResponse({"message": "Na túto akciu nie je možné dať feedback"}, status=401)
    if len(action) == 0:
        return JsonResponse({"message": "Na túto akciu nie je možné dať feedback"}, status=401)  
    return JsonResponse(list(action.values()), safe=False)

@csrf_exempt
def get_programs(req, id):
    event = Event.objects.filter(id=id)
    values = list(event.values())
    programs = Program.objects.filter(events__id=id)
    pReg = []
    reg = False
    try:
        token = req.GET["token"]
        username = check_login(token)["name"]
        print(username)
        user = User.objects.get(username=username)
        cUser = CustomUser.objects.get(user=user)
        regs = Event_registration.objects.filter(user=cUser, event=event[0])
        if len(regs) > 0:
            reg = True
        for prog in programs:
            progReg = Program_registration.objects.filter(user=cUser, program=prog)
            if len(progReg) > 0:
                pReg.append(True)
            else:
                pReg.append(False)
    except:
        pReg = [False for _ in programs]
    
    values[0]["registered"] = reg
    values[0]["programs"] = list(programs.values())
    for i in range(len(values[0]["programs"])):
        print(programs[i].program_type)
        values[0]['programs'][i]["registered"] = pReg[i]
        values[0]["programs"][i]["program_type"] = programs[i].program_type.name
    print(values[0]["programs"])
    return JsonResponse(values, safe=False)

@csrf_exempt
def register_program(req):
    body = json.loads(req.body)
    token, program_id = body["token"], body["id"]
    
    username = check_login(token)
    user = User.objects.get(username=username["name"])
    customUser = CustomUser.objects.get(user=user)

    try:
        program = Program.objects.get(id=program_id)
        Program_registration.objects.get(user=customUser, program=program)
        return JsonResponse({"message": "Na tento program už ste zaregistrovaný"}, status=401)
    except:
        pass

    try:
        preg = Program_registration.objects.create(
            user=customUser,
            program=program,
        )
    except Exception as error:
        return JsonResponse({"message": "Nepodarilo sa zaregistrovať na program"}, status=401)

    preg.save()

    return JsonResponse({})

@csrf_exempt
def load_my_programs(req):
    username = None
    try:
        token = req.GET["token"]
        username = check_login(token)
    except:
        return JsonResponse({"message": "Nie ste prihlásený"}, status=401)
    programs = Program.objects.filter(visible=True)
    registrations = []

    if username:
        user = User.objects.get(username=username["name"])
        cUser = CustomUser.objects.get(user=user)
        for prog in programs:
            if Program_registration.objects.filter(user=cUser, program=prog):
                registrations.append(True)
            else:
                registrations.append(False)
    if len(registrations) == 0:
        registrations = [False for prog in programs]
    res = list(programs.values())
    myprograms = []
    for i in range(len(res)):
        if registrations[i]:
            res[i]["registered"] = registrations[i]
            res[i]["type"] = programs[i].program_type.name
            myprograms.append(res[i])
    return JsonResponse(myprograms, safe=False)

@csrf_exempt
def logout(req, aType, id):
    body = json.loads(req.body)
    token = body["token"]
    
    username = check_login(token)

    try:
        user = User.objects.get(username=username["name"])
        cUser = CustomUser.objects.get(user=user)
        action = Event.objects.get(id=id) if aType == "event" else Program.objects.get(id=id)
        reg = Event_registration.objects.get(user=cUser, event=action) if aType=="event" else Program_registration.objects.get(user=cUser, program=action)
        reg.delete()
        if aType == "event" and len(cUser.roles.all()) > 0:
            cuRoles = cUser.roles.all()
            toRemove = None
            for role in cuRoles:
                if role.role_type.name == 'org' and role.event==action:
                    toRemove = role
            print(toRemove)
            if cuRoles is not None:
                cUser.roles.remove(toRemove)
            print("done")
    except:
        return JsonResponse({"message": "Nepodarilo sa zrušiť registráciu"}, status=401)
    return JsonResponse({})
