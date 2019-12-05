from database import *


@db_session
def registration(st_num, first_name, last_name, course, password):
    # st_num = re.search(r'[0-9]{6}', st)
    if len(password) >= 8:
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
def get_comission_tasks(com_name):
    Task.select(lambda t: t.comission.name == com_name).show()


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


show_tables()
