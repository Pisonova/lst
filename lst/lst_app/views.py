from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
from django.contrib.auth.models import User
import jwt
from django.conf import settings


@csrf_exempt
def login(req):
    body = json.loads(req.body)
    name, password = body["username"], body["password"]
    print(name, password)
    users = User.objects.filter(username=name)

    if users.count() == 0:
        return JsonResponse({"message": "No user found"}, status=401)

    user = users.first()

    if not user.check_password(raw_password=password):
        return JsonResponse({"message": "Wrong password"}, status=401)

    token = jwt.encode({"name": name}, key=settings.SECRET_KEY, algorithm="HS256")
    return JsonResponse({"token": token})
    