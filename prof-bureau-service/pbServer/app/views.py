from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from .models import *
import social_core

import json
from django.http import JsonResponse
import re
import datetime
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication
import requests


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return None


def index(request):
    return render(request, "index.html")


# @csrf_exempt
# @api_view(["POST"])
# @permission_classes((AllowAny,))
# @authentication_classes((CsrfExemptSessionAuthentication,))
# def vk_auth(request):
#     print(request.user)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes((CsrfExemptSessionAuthentication,))
def registration(request):
    user_login = request.user.get_username()
    print(user_login)
    request_json = json.load(request)
    print(request_json)
    first_name = request_json["firstName"]
    last_name = request_json["lastName"]
    course = request_json["course"]
    email = request_json["email"]
    password = request_json["password"]

    try:
        st = int(re.search(r'[0-9]{6}', email).group(0))
        User(user_st=st, last_name=last_name, first_name=first_name, course=course,
             password=password, user_login=user_login).save()
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
@authentication_classes((CsrfExemptSessionAuthentication,))
def vk_login(request):
    if request.user.is_authenticated:
        try:
            user = User.objects.get(user_login=request.user.get_username())
            response_json = JsonResponse({"success": True,
                                          "isReged": True,
                                          "name": user.__str__(),
                                          "course": user.course,
                                          "stNum": user.user_st})
        except:
            response_json = JsonResponse({"success": True,
                                          "isReged": False,
                                          "name": request.user.get_full_name()})
    else:
        response_json = JsonResponse({"success": False,
                                      "error": "not authenticated"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json



@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes((CsrfExemptSessionAuthentication,))
def login(request):
    request_json = json.load(request)

    # vk_id = VKOAuth2.

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
@authentication_classes((CsrfExemptSessionAuthentication,))
def get_personal_info(request):
    request_json = json.load(request)
    try:
        user_st = request_json["stNum"]
        user = User.objects.get(user_st=user_st)
        tasks_array = []
        tasks_ended_array = []
        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if not string.is_done:
                if string.is_sent:
                    tasks_ended_array.append({"title": string.task.task_title,
                                              # "description": string.task.task_description,
                                              "comission": string.task.comission.name})
                else:
                    tasks_array.append({"title": string.task.task_title,
                                        "description": string.task.task_description,
                                        "comission": string.task.comission.name})
        com_info_dict = {}
        for comission in Comission.objects.all():
            is_pred = user_st == comission.chairman.user_st
            com_tasks = Task.objects.filter(comission__exact=comission)
            com_tasks_array = []
            sent_tasks_array = []
            for task in com_tasks:
                try:
                    task_exec = Task_executor.objects.get(task=task)
                    if is_pred and task_exec.is_sent and not task_exec.is_done:
                        sent_tasks_array.append({"title": task.task_title,
                                                 "description": task_exec.who_do.__str__(),
                                                 "comission": task.comission.name})
                except Task_executor.DoesNotExist:
                    com_tasks_array.append({"title": task.task_title,
                                            "description": task.task_description,
                                            "comission": task.comission.name})
            try:
                Comission_member.objects.get(user=user, comission=comission)
                is_member = True
            except Comission_member.DoesNotExist:
                is_member = False

            com_info_dict[comission.name] = {
                "predName": comission.chairman.__str__(),
                "newsList": {},
                "taskList": com_tasks_array,
                "isAPred": is_pred,
                "isAMember": is_member,
                "sentTasks": sent_tasks_array
            }
        response = JsonResponse({"success": True,
                                 "userTasks": tasks_array,
                                 "userTasksEnded": tasks_ended_array,
                                 "comInfo": com_info_dict,
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
@authentication_classes((CsrfExemptSessionAuthentication,))
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
            if not string.is_done:
                if string.is_sent:
                    tasks_ended_array.append({"title": string.task.task_title,
                                              # "description": string.task.task_description,
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
@authentication_classes((CsrfExemptSessionAuthentication,))
def send_task(request):
    request_json = json.load(request)
    user_st = request_json["stNum"]
    task_title = request_json["taskTitle"]
    com_name = request_json["comName"]
    is_pred_action = request_json["predAction"]

    try:
        user = User.objects.get(user_st=user_st)
        comission = Comission.objects.get(name=com_name)
        task = Task.objects.get(comission=comission, task_title=task_title)

        task_exec = Task_executor.objects.get(task=task)
        if is_pred_action:
            task_exec.is_done = True
        else:
            task_exec.is_sent = True
            # post_to_lambda(user, task)
        task_exec.save()

        tasks_array = []
        tasks_ended_array = []
        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if not string.is_done:
                if string.is_sent:
                    tasks_ended_array.append({"title": string.task.task_title,
                                              # "description": string.task.task_description,
                                              "comission": string.task.comission.name})
                else:
                    tasks_array.append({"title": string.task.task_title,
                                        "description": string.task.task_description,
                                        "comission": string.task.comission.name})
        com_tasks_array = []
        com_tasks = Task.objects.filter(comission__exact=comission)
        is_pred = user_st == comission.chairman.user_st
        sent_tasks_array = []
        for task in com_tasks:
            try:
                task_exec = Task_executor.objects.get(task=task)
                if is_pred and task_exec.is_sent and not task_exec.is_done:
                    sent_tasks_array.append({"title": task.task_title,
                                             "description": task_exec.who_do.__str__(),
                                             "comission": task.comission.name})
            except Task_executor.DoesNotExist:
                    com_tasks_array.append({"title": task.task_title,
                                            "description": task.task_description,
                                            "comission": task.comission.name})
        response_json = JsonResponse({"success": True,
                                      "userTasks": tasks_array,
                                      "userTasksEnded": tasks_ended_array,
                                      "comTasks": com_tasks_array,
                                      "sentTasks": sent_tasks_array,
                                      "comName": com_name})
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
@authentication_classes((CsrfExemptSessionAuthentication,))
def decline_task(request):
    request_json = json.load(request)
    user_st = request_json["stNum"]
    task_title = request_json["taskTitle"]
    com_name = request_json["comName"]
    is_pred_action = request_json["predAction"]

    try:
        user = User.objects.get(user_st=user_st)
        comission = Comission.objects.get(name=com_name)
        task = Task.objects.get(comission=comission, task_title=task_title)

        if is_pred_action:
            task_exec = Task_executor.objects.get(task=task)
            task_exec.is_sent = False
            task_exec.save()
        else:
            Task_executor.objects.get(who_do=user, task=task).delete()

        tasks_array = []
        tasks_ended_array = []
        exec_tasks = Task_executor.objects.filter(who_do__exact=user)
        for string in exec_tasks:
            if not string.is_done:
                if string.is_sent:
                    tasks_ended_array.append({"title": string.task.task_title,
                                              # "description": string.task.task_description,
                                              "comission": string.task.comission.name})
                else:
                    tasks_array.append({"title": string.task.task_title,
                                        "description": string.task.task_description,
                                        "comission": string.task.comission.name})
        com_tasks_array = []
        com_tasks = Task.objects.filter(comission__exact=comission)
        is_pred = user_st == comission.chairman.user_st
        sent_tasks_array = []
        for task in com_tasks:
            try:
                task_exec = Task_executor.objects.get(task=task)
                if is_pred and task_exec.is_sent:
                    sent_tasks_array.append({"title": task.task_title,
                                             "description": task_exec.who_do.__str__(),
                                             "comission": task.comission.name})
            except Task_executor.DoesNotExist:
                com_tasks_array.append({"title": task.task_title,
                                        "description": task.task_description,
                                        "comission": task.comission.name})

        response_json = JsonResponse({"success": True,
                                      "userTasks": tasks_array,
                                      "userTasksEnded": tasks_ended_array,
                                      "comTasks": com_tasks_array,
                                      "sentTasks": sent_tasks_array,
                                      "comName": com_name})
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


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes((CsrfExemptSessionAuthentication,))
def add_task(request):
    request_json = json.load(request)
    try:
        chairman_st = request_json["stNum"]
        title = request_json["title"]
        description = request_json["description"]
        deadline_str = request_json["deadline"]

        deadline = datetime.datetime.strptime(deadline_str, '%Y-%m-%d').date()
        chairman = User.objects.get(user_st=chairman_st)

        com_name = comission.name

        try:
            Task.objects.get(comission=comission, task_title=title)
            response_json = JsonResponse({"success": False,
                                          "errror": "task already exists"})
        except Task.DoesNotExist:
            Task(comission=comission, task_title=title, task_description=description, deadline=deadline).save()
            com_tasks_array = []
            com_tasks = Task.objects.filter(comission__exact=comission)
            for task in com_tasks:
                try:
                    Task_executor.objects.get(task=task)
                except Task_executor.DoesNotExist:
                    com_tasks_array.append({"title": task.task_title,
                                            "description": task.task_description,
                                            "comission": com_name})

            response_json = JsonResponse({"success": True,
                                          "comName": com_name,
                                          "comTasks": com_tasks_array})
    except KeyError:
        response_json = JsonResponse({"success": False,
                                      "error": "wrong request data"})
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
@authentication_classes((CsrfExemptSessionAuthentication,))
def enter_or_leave_com(request):
    request_json = json.load(request)

    try:
        user_st = request_json["stNum"]
        action = request_json["action"]
        com_name = request_json["comName"]

        user = User.objects.get(user_st=user_st)
        comission = Comission.objects.get(name=com_name)
        response_json = JsonResponse({})

        if action == 'leave':
            Comission_member.objects.get(user=user, comission=comission).delete()
            response_json = JsonResponse({"success": True})
            # com_action_lambda(user.__str__(), com_name, action)
        elif action == 'enter':
            try:
                Comission_member.objects.get(user=user, comission=comission)
                response_json = JsonResponse({"success": False,
                                              "error": "already exists"})
            except Comission_member.DoesNotExist:
                Comission_member(user=user, comission=comission).save()
                ch_name = comission.chairman.__str__()
                response_json = JsonResponse({"predName": ch_name,
                                              "success": True})
        com_action_lambda(user.__str__(), com_name, action)
    except KeyError:
        response_json = JsonResponse({"success": False,
                                      "error": "wrong request data"})
    except User.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "user not found"})
    except Comission.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "comission not found"})
    except Comission_member.DoesNotExist:
        response_json = JsonResponse({"success": False,
                                      "error": "comission member not found"})

    response_json['Access-Control-Allow-Origin'] = '*'
    response_json["Access-Control-Allow-Headers"] = '*'
    return response_json


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
@authentication_classes((CsrfExemptSessionAuthentication,))
def vk_logout(request):
    try:
        if request.user.get_username() != 'admin':
            request.user.delete()
        json_resp = JsonResponse({"success": True})
        print('success')
    except Exception as e:
        print(e.__class__)
        json_resp = JsonResponse({"success": False})

    json_resp['Access-Control-Allow-Origin'] = '*'
    json_resp["Access-Control-Allow-Headers"] = '*'
    return json_resp


def com_action_lambda(username, com_name, action):
    message = "wrong action"
    if action == 'leave':
        message = "Пользователь " + username + " вышел из комиссии " + com_name
    elif action == 'enter':
        message = "Пользователь " + username + " вступил в комиссию " + com_name

    data = {
        "phoneNumber": "+79222162625",
        "message": message
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post("https://763j80cm05.execute-api.us-east-1.amazonaws.com/test/myresource",
                             json=data, headers=headers)


# @csrf_exempt
# @api_view(["POST"])
# @permission_classes((AllowAny,))
# @authentication_classes((CsrfExemptSessionAuthentication,))
# def test_lambda(request):
#     post_to_lambda()
#     print('success')
#
#     response = JsonResponse({})
#     return response
#
#
# def post_to_lambda():
#     data = {
#         "phoneNumber": "+79222162625",
#         "message": "testing lambda"
#     }
#     headers = {
#         "Content-Type": "application/json"
#     }
#     try:
#         response = requests.post("https://763j80cm05.execute-api.us-east-1.amazonaws.com/test/myresource",
#                                 json=data, headers=headers)
#         print(response.status_code)
#         print('lambda success')
#     except Exception as e:
#         print(e)
