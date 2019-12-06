from database import *
import string
import random
import datetime


@db_session
def gen_users(st_start, num, last_names, first_names):
    user_sts = [i for i in range(11111, 11111 + num)]
    courses = [random.randint(1, 6) for _ in range(num)]
    passwords = gen_passwords(8, num)
    for i in range(len(user_sts)):
        User(user_st=user_sts[i], last_name=last_names[i], first_name=first_names[i],
             course=courses[i], password=passwords[i])
    User.select().show()


# def gen_sts(start, num):
#     sts = []
#     for i in range(start, start + num):
#         sts.append(i)
#     return sts


def gen_passwords(length, num):
    passwords = []
    vocab = string.ascii_lowercase
    for _ in range(num):
        passwords.append(''.join([random.choice(vocab) for _ in range(length)]))
    return passwords


@db_session
def create_comission(ch_name, ch_surname, com_name):
    chairman = User.get(first_name=ch_name, last_name=ch_surname)
    if chairman:
        com = Comission(name=com_name, pred=chairman)
        Comissions_member(user=chairman, comission=com)


@db_session
def gen_following(st_start, num):
    # comissions = ["PM-Design", "PM-Partner", "FunCom", "PM-Photo", "КультМасс", "СпортКом"]
    for i in range(st_start, st_start + num):
        for j in range(3):
            user = User[i]
            comission = Comission[random.randint(1, 6)]
            if not Comissions_member.get(user=user, comission=comission):
                Comissions_member(user=user, comission=comission)
    Comissions_member.select().show()


@db_session
def gen_tasks(num):
    # comissions = ["PM-Design", "PM-Partner", "FunCom", "PM-Photo", "КультМасс", "СпортКом"]
    for i in range(num):
        title = "Название " + str(i + 1) + " задания"
        description = "Полное описание " + str(i + 1) + " задания"
        deadline = datetime.date.today()
        Task(comission=Comission[random.randint(1, 6)],
             title=title, description=description, deadline=deadline)
    Task.select().show()


@db_session
def gen_news(num):
    # comissions = ["PM-Design", "PM-Partner", "FunCom", "PM-Photo", "КультМасс", "СпортКом"]
    for i in range(num):
        title = "Название " + str(i + 1) + " новости"
        description = "Полное описание " + str(i + 1) + " новости"
        News(comission=Comission[random.randint(1, 6)],
             title=title, description=description)
    News.select().show()


@db_session
def gen_put_tasks(num):
    for i in range(1, num + 1):
        com = Task[i].comission
        for j in range(1, 54):
            if Comissions_member[j].comission == com:
                user_st = Comissions_member[j].user.user_st
                Task_executor(task=Task[i], who_do=User[user_st])
                break
    Task_executor.select().show()


@db_session
def gen_sent_tasks(num):
    half = round(num / 2)
    for i in range(half):
        Task_executor[random.randint(1, num)].is_sent = True
    Task_executor.select().show()


# last_names = ['Крылова', 'Докиенко', 'Рыбаков', "Игнатьев", "Кульминский", "Масалев",
#               "Мельников", "Олешкевич", "Павлова", "Петров", "Романычев", "Спирякова",
#               "Терещенко", "Шарафутдинов", "Пахомов", "Барташук", "Малышева",
#               "Пахомова", "Кудряшова", "Енин"]
# first_names = ["Ольга", "Денис", "Сергей", "Денис", "Данил", "Владимир",
#                "Дмитрий", "Евгений", "Екатерина", "Михаил", "Леонид", "Юлия",
#                "Дмитрий", "Тимур", "Максим", "Анастасия", "Алина",
#                "Арина", "Дарья", "Никита"]

# gen_users(11111, 20, last_names, first_names)
# create_comission("Анастасия", "Барташук", "PM-Partner")
# create_comission("Дарья", "Кудряшова", "КультМасс")
# create_comission("Никита", "Енин", "FunCom")
# create_comission("Сергей", "Рыбаков", "СпортКом")
# create_comission("Арина", "Пахомова", "PM-Photo")
# create_comission("Алина", "Малышева", "Профбюро")
# create_comission("Ольга", "Крылова", "PM-Design")
# gen_following(11111, 20)
#
tasks_news_num = 15

# gen_tasks(tasks_news_num)
# gen_news(tasks_news_num)
# gen_put_tasks(tasks_news_num)

# gen_sent_tasks(tasks_news_num)


