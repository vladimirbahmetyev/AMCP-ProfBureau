from datetime import date
from pony.orm import *

import re


db = Database()


db.bind(provider='sqlite', filename='database.sqlite', create_db=True)


class User(db.Entity):
    user_st = PrimaryKey(int, size=16, unsigned=True)
    first_name = Required(str)
    last_name = Required(str, 20)
    course = Required(int, size=8, unsigned=True)
    pred_comission = Optional('Comission', cascade_delete=True)
    comissions = Set('Comissions_member')
    task = Set('Task_executor')
    password = Required(str, 16)


class Comission(db.Entity):
    name = PrimaryKey(str)
    pred = Required(User)
    news = Set('News')
    tasks = Set('Task')
    comissions_members = Set('Comissions_member', cascade_delete=True)


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


@db_session
def registration(st, first_name, last_name, course, password):
    st_num = re.search(r'[0-9]{6}', st)
    if len(password) >= 8 and int(st_num.group(0)):
        st_num = int(st_num.group(0))
        User(user_st=st_num, first_name=first_name, last_name=last_name, course=course, password=password)
    else:
        print('nope')


@db_session
def delete_user(user_st):
    User.get(user_st=user_st).delete()


@db_session
def auth(st_num, password):
    if User.get(user_st=st_num, password=password) is not None:
        print('found')
    else:
        print('nf')


@db_session
def add_comission(name, pred_st):
    pred = User.get(user_st=pred_st)
    if pred:
        com = Comission(name=name, pred=pred)
        Comissions_member(user=pred, comission=com)


@db_session
def add_task(comission, title, description, deadline):
    Task(comission=comission, title=title, description=description, deadline=deadline)

@db_session
def put_task(st_num, task_title):
    user = User.get(user_st=st_num)
    task = Task.get(title=task_title)
    if user and task:
        Task_executor(task=task, who_do=user, is_sent=False, is_done=False)


@db_session
def send_task(task_name, exec_st):
    task = Task_executor.get(who_do=User[exec_st], task=Task.get(title=task_name))
    if task:
        task.is_sent = True

@db_session
def task_is_done(task_name, exec_st):
    task = Task_executor.get(who_do=User[exec_st], task=Task.get(title=task_name))
    if task.is_sent:
        task.is_done = True


@db_session
def delete_task(comission, task_name):
    Task.get(comission=comission, title=task_name).delete()


@db_session
def follow_comission(st_num, com_name):
    user = User.get(user_st=st_num)
    comission = Comission.get(name=com_name)
    if user and comission:
        Comissions_member(comission=comission, user=user)


@db_session
def unfollow_comission(user_st, com_name):
    Comissions_member.get(user=User[user_st], comission=Comission[com_name]).delete()


@db_session
def add_news(comission, title, description):
    News(comission=comission, title=title, description=description)


@db_session
def delete_news(comission, title):
    News.get(comission=comission, title=title).delete()


@db_session
def show_tables():
    print('Users:')
    User.select().show()
    print('\nComissions:')
    Comission.select().show()
    print('\nComissions memebers:')
    Comissions_member.select().show()
    print('\nTasks:')
    Task.select().show()
    print('\nTask executors:')
    Task_executor.select().show()
    print('\nNews:')
    News.select().show()


# registration('st061177', 'Ольга', 'Крылова', 3, 'myPassword')
# add_comission('PM-Design', 61177)
# registration('st054461', 'Владимир', 'Бахметьев', 3, 'hisPassword')
# follow_comission(54461, 'PM-Design')
# registration('st012345', 'Vasya', 'Pupkin', 4, 'qwertyuio')
# follow_comission(12345, 'PM-Design')
# delete_user(12345)
# add_task('PM-Design', 'some body', 'once told me', date.today())
# put_task(54461, 'some body')
# send_task('some body', 54461)
# task_is_done('some body', 54461)
# delete_task(Comission['PM-Design'], 'some body')
# add_news(Comission['PM-Design'], 'wow!', 'shock-content!')
# delete_news(Comission['PM-Design'], 'wow!')


show_tables()
