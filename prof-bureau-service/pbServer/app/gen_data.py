from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import *
from django.db.utils import IntegrityError
from django.http import HttpResponse
import string
import random
import datetime


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def gen_data(request):
    # last_names = ['Докиенко', "Игнатьев", "Кульминский", "Масалев",
    #               "Мельников", "Олешкевич", "Павлова", "Петров", "Романычев", "Спирякова",
    #               "Терещенко", "Шарафутдинов", "Пахомов"]
    # first_names = ["Денис", "Денис", "Данил", "Владимир",
    #                "Дмитрий", "Евгений", "Екатерина", "Михаил", "Леонид", "Юлия",
    #                "Дмитрий", "Тимур", "Максим"]
    # gen_users(first_names, last_names, 22222)
    gen_following(2, 3)
    gen_tasks(20)
    gen_take_tasks(20)
    # gen_news(5)
    return HttpResponse()


def gen_users(first_names, last_names, st_start):
    num = len(first_names)
    user_sts = [i for i in range(st_start, st_start + num)]
    courses = [random.randint(1, 6) for _ in range(num)]
    passwords = gen_passwords(8, num)
    for i in range(len(user_sts)):
        User(user_st=user_sts[i], last_name=last_names[i], first_name=first_names[i],
             course=courses[i], password=passwords[i]).save()


def gen_passwords(length, num):
    passwords = []
    vocab = string.ascii_lowercase
    for _ in range(num):
        passwords.append(''.join([random.choice(vocab) for _ in range(length)]))
    return passwords


def gen_following(min_num, max_num):
    comissions = Comission.objects.all()
    for com in comissions:
        chairman = com.chairman
        Comission_member(user=chairman, comission=com).save()

    users = User.objects.all()
    for user in users:
        for _ in range(random.randint(min_num, max_num)):
            comission = comissions[random.randint(0, 7)]
            try:
                Comission_member.objects.get(user=user, comission=comission)
            except Comission_member.DoesNotExist:
                Comission_member(user=user, comission=comission).save()


def gen_tasks(num):
    coms = Comission.objects.all()
    for com in coms:
        for i in range(num):
            title = "Таск " + str(i + 1) + "  комиссии " + com.name
            description = "Подробное описание задания номер " + str(i + 1) + " от комисии " + com.name
            date_str = str(random.randint(1, 28)) + "-" + str(random.randint(1, 12)) + "-2020"
            deadline = datetime.datetime.strptime(date_str, '%d-%m-%Y')
            Task(comission=com, task_title=title, task_description=description, deadline=deadline).save()


def gen_take_tasks(num):
    users = User.objects.all()
    for user in users:
        user_coms = Comission_member.objects.filter(user__exact=user)
        for user_com in user_coms:
            com = user_com.comission
            com_tasks = Task.objects.filter(comission__exact=com)
            # i = 0
            while True:
                try:
                    Task_executor(who_do=user, task=com_tasks[random.randint(0, num - 1)]).save()
                    break
                except IntegrityError:
                    continue
            while True:
                try:
                    Task_executor(who_do=user, task=com_tasks[random.randint(0, num - 1)], is_sent=True).save()
                    break
                except IntegrityError:
                    continue


def gen_news(num):
    coms = Comission.objects.all()
    for com in coms:
        for i in range(num):
            title = "Новость номер " + str(i + 1) + " комисии " + com.name
            description = "Описание это свежей новоти номер " + str(i + 1) + " от комиссии " + com.name
            News(comission=com, news_title=title, news_description=description).save()
