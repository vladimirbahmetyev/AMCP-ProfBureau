from datetime import date
from pony.orm import *


db = Database()


db.bind(provider='sqlite', filename='db.sqlite3', create_db=True)


class User(db.Entity):
    user_st = PrimaryKey(int, size=16, unsigned=True)
    first_name = Required(str)
    last_name = Required(str, 20)
    course = Required(int, size=8, unsigned=True)
    pred_comission = Optional('Comission')
    comissions = Set('Comission_member')
    task = Set('Task_executor')
    password = Required(str, 16)


class Comission(db.Entity):
    name = PrimaryKey(str)
    chairman = Required(User)
    news = Set('News')
    tasks = Set('Task')
    comission_members = Set('Comission_member')


class Comission_member(db.Entity):
    # id = PrimaryKey(int, auto=True)
    comission = Required(Comission)
    user = Required(User)


class Task(db.Entity):
    task_id = PrimaryKey(int, auto=True)
    comission = Required(Comission)
    task_executors = Set('Task_executor')
    task_title = Required(str)
    task_description = Optional(str)
    deadline = Optional(date)


class Task_executor(db.Entity):
    # id = PrimaryKey(int, auto=True)
    task = Required(Task)
    who_do = Required(User)
    is_sent = Required(bool, default=False)
    is_done = Required(bool, default=False)


class News(db.Entity):
    news_id = PrimaryKey(int, auto=True)
    comission = Required(Comission)
    news_title = Required(str)
    news_description = Optional(str)
    # is_actual = Required(bool, default=True)


db.generate_mapping(create_tables=True)
