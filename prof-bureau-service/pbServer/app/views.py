# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import *
# from rest_framework.response import Response
# from django.views.generic import TemplateView
# from django.shortcuts import render

import json
from django.http import JsonResponse
import re

# Create your views here.
from django.http import HttpResponse


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

    try:
        st = int(re.search(r'[0-9]{6}', email).group(0))
        User(user_st=st, last_name=last_name, first_name=first_name, course=course, password=password).save()
        resp = JsonResponse({"success": True,
                             "st": st})
    except AttributeError:
        resp = JsonResponse({"success": False,
                             "error": "wrong email"})

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
                                          "success": True,
                                          "stNum": user_login})
        except User.DoesNotExist:
            response_json = JsonResponse({"success": False,
                                          "error": "user does not exist"})
    except AttributeError:
        response_json = JsonResponse({"success": False,
                                      "error": "wrong login"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def get_personal_info(request):
    request_json = json.load(request)

    try:
        user_st = request_json["stNum"]
        user = User.objects.get(user_st=user_st)
        tasks_array = []
        tasks_ended_array = []
        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if string.is_sent:
                tasks_ended_array.append({"title": string.task.task_title,
                                          "description": string.task.task_description,
                                          "comission": string.task.comission.name})
            else:
                tasks_array.append({"title": string.task.task_title,
                                    "description": string.task.task_description,
                                    "comission": string.task.comission.name})

        about_coms_dict = {}
        for comission in Comission.objects.all():
            com_tasks = Task.objects.filter(comission__exact=comission)
            com_tasks_array = []
            for task in com_tasks:
                try:
                    Task_executor.objects.get(task=task)
                    continue
                except Task_executor.DoesNotExist:
                    com_tasks_array.append({"title": task.task_title,
                                            "description": task.task_description,
                                            "comission": task.comission.name})

            is_pred = user_st == comission.chairman.user_st
            try:
                Comission_member.objects.get(user=user, comission=comission)
                is_member = True
            except Comission_member.DoesNotExist:
                is_member = False

            about_coms_dict[comission.name] = {
                "predName": comission.chairman.__str__(),
                "newsList": {},
                "taskList": com_tasks_array,
                "isAPred": is_pred,
                "isAMember": is_member
            }
        response = JsonResponse({"success": True,
                                 "userTasks": tasks_array,
                                 "userTasksEnded": tasks_ended_array,
                                 "comInfo": about_coms_dict,
                                 "newsList": {}})
    except User.DoesNotExist:
        response = JsonResponse({"success": False,
                                 "error": "user does not exist"})
    except ValueError:
        response = JsonResponse({"success": False})

    response['Access-Control-Allow-Origin'] = '*'
    response["Access-Control-Allow-Headers"] = '*'
    return response


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def take_task(request):
    request_json = json.load(request)
    com_name = request_json["comName"]
    user_st = request_json["stNum"]
    task_title = request_json["taskTitle"]

    try:
        user = User.objects.get(user_st=user_st)
        comission = Comission.objects.get(name=com_name)
        task = Task.objects.get(comission=comission, task_title=task_title)

        Task_executor(task=task, who_do=user).save()

        tasks_array = []
        tasks_ended_array = []
        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if string.is_sent:
                tasks_ended_array.append({"title": string.task.task_title,
                                          "description": string.task.task_description,
                                          "comission": string.task.comission.name})
            else:
                tasks_array.append({"title": string.task.task_title,
                                    "description": string.task.task_description,
                                    "comission": string.task.comission.name})
        com_tasks = Task.objects.filter(comission__exact=comission)
        com_tasks_array = []
        for task in com_tasks:
            try:
                Task_executor.objects.get(task=task)
                continue
            except Task_executor.DoesNotExist:
                com_tasks_array.append({"title": task.task_title,
                                        "description": task.task_description,
                                        "comission": task.comission.name})

        response_json = JsonResponse({"success": True,
                                      "userTasks": tasks_array,
                                      "userTasksEnded": tasks_ended_array,
                                      "comTasks": com_tasks_array})
    except User.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "user not found"})
    except Comission.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "comission not found"})
    except Task.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "task not found"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def send_task(request):
    request_json = json.load(request)
    user_st = request_json["stNum"]
    task_title = request_json["taskTitle"]
    com_name = request_json["comName"]

    try:
        user = User.objects.get(user_st=user_st)
        comission = Comission.objects.get(name=com_name)
        task = Task.objects.get(comission=comission, task_title=task_title)

        task_exec = Task_executor.objects.get(who_do=user, task=task)
        task_exec.is_sent = True
        task_exec.save()

        tasks_array = []
        tasks_ended_array = []

        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if string.is_sent:
                tasks_ended_array.append({"title": string.task.task_title,
                                          "description": string.task.task_description,
                                          "comission": string.task.comission.name})
            else:
                tasks_array.append({"title": string.task.task_title,
                                    "description": string.task.task_description,
                                    "comission": string.task.comission.name})

        response_json = JsonResponse({"success": True,
                                      "userTasks": tasks_array,
                                      "userTasksEnded": tasks_ended_array})

    except User.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "user not found"})
    except Comission.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "comission not found"})
    except Task.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "task not found"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def decline_task(request):
    request_json = json.load(request)
    user_st = request_json["stNum"]
    task_title = request_json["taskTitle"]
    com_name = request_json["comName"]

    try:
        user = User.objects.get(user_st=user_st)
        comission = Comission.objects.get(name=com_name)
        task = Task.objects.get(comission=comission, task_title=task_title)

        Task_executor.objects.get(who_do=user, task=task).delete()

        tasks_array = []
        tasks_ended_array = []
        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if string.is_sent:
                tasks_ended_array.append({"title": string.task.task_title,
                                          "description": string.task.task_description,
                                          "comission": string.task.comission.name})
            else:
                tasks_array.append({"title": string.task.task_title,
                                    "description": string.task.task_description,
                                    "comission": string.task.comission.name})
        com_tasks_array = []
        com_tasks = Task.objects.filter(comission__exact=comission)
        for task in com_tasks:
            com_tasks_array.append({"title": task.task_title,
                                    "description": task.task_description,
                                    "comission": com_name})

        response_json = JsonResponse({"success": True,
                                      "userTasks": tasks_array,
                                      "userTasksEnded": tasks_ended_array,
                                      "comTasks": com_tasks_array})
    except User.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "user not found"})
    except Comission.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "comission not found"})
    except Task.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "task not found"})
    except Task_executor.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "user's tasks not found"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json



