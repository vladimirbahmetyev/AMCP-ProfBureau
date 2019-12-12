# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from pbServer.pbsite.models import *
# from rest_framework.response import Response
# from django.views.generic import TemplateView
# from django.shortcuts import render

import json
from django.http import JsonResponse
import re

# Create your views here.
# from django.http import HttpResponse


# def index(request):
#     return render(request, "index.html")


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registration(request):
    request_json = json.load(request)
    first_name = request_json["firstName"]
    last_name = request_json["lastName"]
    course = request_json["course"]
    email = request_json["email"]
    password = request_json["password"]

    st = int(re.search(r'[0-9]{6}', email).group(0))

    User(user_st=st, last_name=last_name, first_name=first_name, course=course, password=password).save()

    resp = JsonResponse({"st": st})
    resp['Access-Control-Allow-Origin'] = '*'
    resp["Access-Control-Allow-Headers"] = '*'
    return resp


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    request_json = json.load(request)

    try:
        user_login = int(re.search(r'[0-9]{6}', request_json["login"]).group(0))
        password = request_json["password"]
        try:
            user = User.objects.get(user_st=user_login, password=password)
            response_json = JsonResponse({"name": user.first_name + " " + user.last_name,
                                          "course": user.course,
                                          "success": True})
        except User.DoesNotExist:
            response_json = JsonResponse({"success": False,
                                          "error": "user does not exist"})
    except AttributeError:
        response_json = JsonResponse({"success": False,
                                      "error": "wrong login"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json




