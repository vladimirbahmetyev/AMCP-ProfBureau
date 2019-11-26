from datetime import date
from pony.orm import *


db = Database()


db.bind(provider='sqlite', filename='database.sqlite', create_db=True)


class User(db.Entity):
    user_id = PrimaryKey(int, size=8, auto=True, unsigned=True)
    user_st = Required(int, size=16, unique=True, unsigned=True)
    first_name = Required(str)
    last_name = Required(str, 20)
    course = Required(int, size=8, unsigned=True)
    password = Required('Login_data')
    pred_comission = Optional('Comission')
    comissions = Set('Comissions_member')
    task = Set('Task_executor')


class Login_data(db.Entity):
    user = Optional(User)
    password = Required(str, 16)


class Comission(db.Entity):
    com_id = PrimaryKey(int, size=8, auto=True)
    name = Required(str, 16)
    pred = Required(User)
    news = Set('News')
    tasks = Set('Task')
    members = Optional('Comissions_member')


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


# with db_session:
    # pass1 = Login_data(user=u1, password='loh')
    # u1 = User(user_st=61177, first_name='Olga', last_name='Krylova', course='3', password=Login_data(password='loh'))
    # c1 = Comission(name='PM-Design', pred=u1)
    # n1 = News(comission=c1, title='Hot news!')
    # User.select().show()
    # Comission.select().show()
    # News.select().show()
    # Login_data.select().show()
