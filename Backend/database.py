from datetime import date
from pony.orm import *


db = Database()


db.bind(provider='sqlite', filename='database.sqlite', create_db=True)
# db.bind(provides='postgres', )


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
    com_id = PrimaryKey(int, auto=True)
    name = Required(str)
    pred = Required(User)
    news = Set('News')
    tasks = Set('Task')
    comissions_members = Set('Comissions_member', cascade_delete=True)


class Comissions_member(db.Entity):
    id = PrimaryKey(int, auto=True)
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
    id = PrimaryKey(int, auto=True)
    task = Required(Task)
    who_do = Required(User)
    is_sent = Required(bool, default=False)
    is_done = Required(bool, default=False)


class News(db.Entity):
    news_id = PrimaryKey(int, auto=True)
    comission = Required(Comission)
    title = Required(str)
    description = Optional(str)


db.generate_mapping(create_tables=True)
