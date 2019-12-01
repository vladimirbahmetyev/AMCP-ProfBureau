from datetime import date
from pony.orm import *

import re


db = Database()


db.bind(provider='sqlite', filename='database.sqlite', create_db=True)


class User(db.Entity):
    user_id = PrimaryKey(int, size=8, auto=True, unsigned=True)
    user_st = Required(int, size=16, unique=True, unsigned=True)
    first_name = Required(str)
    last_name = Required(str, 20)
    course = Required(int, size=8, unsigned=True)
    pred_comission = Optional('Comission', cascade_delete=True)
    comissions = Set('Comissions_member')
    task = Set('Task_executor')
    password = Required(str, 16)


class Comission(db.Entity):
    com_id = PrimaryKey(int, size=8, auto=True)
    name = Required(str, 16)
    pred = Required(User)
    news = Set('News')
    tasks = Set('Task')
    comissions_members = Set('Comissions_member')


class Comissions_member(db.Entity):
    comission = Required(Comission)
    user = Required(User)


class Task(db.Entity):
    task_id = PrimaryKey(int, auto=True)
    comission = Required(Comission)
    task_executors = Set('Task_executor')
    title = Required(str)
    description = Optional(str)
    deadline = Optional(date)


class Task_executor(db.Entity):
    task = Required(Task)
    who_do = Required(User)
    is_sent = Required(bool, default='false')
    is_done = Required(bool, default='false')


class News(db.Entity):
    news_id = PrimaryKey(int, auto=True)
    comission = Required(Comission)
    title = Required(str)
    description = Optional(str)


db.generate_mapping(create_tables=True)


def registration(st, first_name, last_name, course, password):
    st_num = re.search(r'[0-9]{6}', st)
    if len(password) >= 8 and int(st_num.group(0)):
        st_num = int(st_num.group(0))
        with db_session:
            u1 = User(user_st=st_num, first_name=first_name, last_name=last_name, course=course, password=password)
            # Comission(name='PM-Design', pred=u1)
            User.select().show()
            Comission.select().show()
    else:
        print('nope')


def auth(st_num, password):
    with db_session:
        if User.get(user_st=st_num, password=password) is not None:
            print('found')
        else:
            print('nf')


def add_task(st_num, comission, title, description, deadline):
    with db_session:
        com = Comission.get(name=comission)
        if User.get(user_st=st_num, pred_comission=com):
            Task(comission=com, title=title, description=description, deadline=deadline)
            Task.select().show()


def put_task(st_num, task_title):
    with db_session:
        user = User.get(user_st=st_num)
        task = Task.get(title=task_title)
        if user and task:
            Task_executor(task=task, who_do=user, is_sent=False, is_done=False)
            Task_executor.select().show()


def follow_comission(st_num, com_name):
    with db_session:
        user = User.get(user_st=st_num)
        comission = Comission.get(name=com_name)
        if user and comission:
            Comissions_member(comission=comission, user=user)
            Comissions_member.select().show()


# registration('st061177', 'Ольга', 'Крылова', '3', 'myPassword')
# auth(61177, 'myPassword')
# add_task(61177, 'PM-Design', 'some body', 'once told me', date(2019, 7, 1))
# put_task(61177, 'some body')
# registration('st012345', 'Вася', 'Пупкин', 2, 'hisPassword')
# follow_comission(61177, 'PM-Design')
# follow_comission(12345, 'PM-Design')
