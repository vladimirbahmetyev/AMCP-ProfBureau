from database import *
import json
import datetime


@db_session
def get_table(table_name, name_str):
    strings = select(string for string in table_name)[:]
    res = {name_str: [string.to_dict() for string in strings]}
    print(json.dumps(res, ensure_ascii=False))


@db_session
def reg_user(data):
    if not User.get(user_st=data["user_st"]):
        User(user_st=data["user_st"], last_name=data["last_name"], first_name=data["first_name"],
             course=data["course"], password=data["password"])
        return {"success": True}
    else:
        return {"error": "User already exists"}


@db_session
def find_user(data):
    try:
        found_user = User.get(user_st=data["login"], password=data["password"])
        return {"found": True,
                "st": found_user.user_st,
                "name": found_user.first_name,
                "surname": found_user.last_name,
                "course": found_user.course}
    except AttributeError:
        return {"found": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_actual_tasks_news(data):
    try:
        response = get_users_tasks(data["user_st"])
        comissions = Comissions_member.select(lambda c: c.user.user_st == data["user_st"])
        com_names = [c.comission.name for c in comissions]
        response["com_tasks"] = get_comission_tasks(com_names)
        response["com_news"] = get_comission_news(com_names)
        return response
    except AttributeError:
        return {"error": "user not found"}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_comission_tasks(com_names):
    try:
        com_tasks_dict = {}
        for com in com_names:
            tasks = Task.select(lambda t: t.comission.name == com)
            task_strings = select(string for string in tasks)[:]
            tasks_array = []
            for task in task_strings:
                executor = Task_executor.get(task=task).who_do
                tasks_array.append({"title": task.title,
                                    "description": task.description,
                                    "deadline": str(task.deadline),
                                    "executor_st": executor.user_st})
            com_tasks_dict[com] = tasks_array
        return com_tasks_dict
    except AttributeError:
        return {"found": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_users_tasks(user_st):
    try:
        executor_tasks = Task_executor.select(lambda t: t.who_do.user_st == user_st)
        executor_strings = select(string for string in executor_tasks)[:]
        tasks_array = []
        tasks_sent_array = []
        for string in executor_strings:
            task = string.task
            if string.is_sent:
                tasks_sent_array.append({"title": task.title,
                                         "description": task.description,
                                         "deadline": str(task.deadline)})
            else:
                tasks_array.append({"title": task.title,
                                    "description": task.description,
                                    "deadline": str(task.deadline)})
        res = {"found": True,
               "tasks": tasks_array,
               "tasks_sent": tasks_sent_array}
        return res
    except AttributeError:
        return {"found": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_comission_news(com_names):
    try:
        news_dict = {}
        for com in com_names:
            news = News.select(lambda n: n.comission.name == com and n.is_actual)
            news_strings = select(string for string in news)[:]
            news_array = []
            for news in news_strings:
                news_array.append({"title": news.title,
                                   "description": news.description})
            news_dict[com] = news_array
        return news_dict
    except AttributeError:
        return {"found": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_comission_members(data):
    try:
        members = Comissions_member.select(lambda c: c.comission.name == data["com_name"])
        members_array = [m.user for m in members]
        res_array = []
        for member in members_array:
            res_array.append({"first_name": member.first_name,
                              "last_name": member.last_name,
                              "course": member.course})
        return {"found": True,
                "members": res_array}
    except AttributeError:
        return {"error": "comission not found"}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_comission_sent_tasks(data):
    try:
        comission = Comission.get(name=data["com_name"])
        tasks = Task.select(lambda t: t.comission == comission)
        task_strings = select(string for string in tasks)[:]
        tasks_array = []
        for task in task_strings:
            sent_tasks = Task_executor.select(lambda te: te.task == task and te.is_sent)
            sent_strings = select(string for string in sent_tasks)[:]
            for string in sent_strings:
                tasks_array.append({"title": task.title,
                                    "description": task.description,
                                    "executor_st": string.who_do.user_st})
        return {"found": True,
                "tasks": tasks_array}
    except AttributeError:
        return {"found": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def check_sent_task(data):
    try:
        com = Comission.get(name=data["comission"])
        task = Task.get(comission=com, title=data["title"])
        task_exec = Task_executor.get(task=task)
        if data["done"]:
            task_exec.is_done = True
        else:
            task_exec.is_sent = False
        return {"success": True}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def add_task(data):
    try:
        comission = Comission.get(name=data["com_name"])
        deadline = datetime.datetime.strptime(data["deadline"], "%Y-%m-%d").date()
        Task(comission=comission, title=data["title"], description=data["description"],
             deadline=deadline)
        return {"success": True}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def add_news(data):
    try:
        comission = Comission.get(name=data["com_name"])
        News(comission=comission, title=data["title"], description=data["description"])
        return {"success": True}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def get_task(data):
    try:
        comission = Comission.get(name=data["com_name"])
        task = Task.get(comission=comission, title=data["title"])
        if task and not Task_executor.get(task=task):
            user = User.get(user_st=data["user_st"])
            Task_executor(task=task, who_do=user)
            return {"success": True}
        elif Task_executor.get(task=task):
            return {"error": "executor already exists"}
        else:
            return {"error": "task not found"}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def send_task(data):
    try:
        user = User.get(user_st=data["user_st"])
        comission = Comission.get(name=data["com_name"])
        task = Task.get(comission=comission, title=data["title"])
        Task_executor.get(task=task, who_do=user).is_sent = True
        return {"success": True}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "syntax error"}


@db_session
def delete_task(data):
    try:
        comission = Comission.get(name=data["com_name"])
        task = Task.get(comission=comission, title=data["title"])
        Task_executor.get(task=task).is_done = True
        return {"success": True}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "task or comission does not exist"}


@db_session
def delete_news(data):
    try:
        comission = Comission.get(name=data["com_name"])
        News.get(comission=comission, title=data["title"]).is_actual = False
        return {"success": True}
    except AttributeError:
        return {"success": False}
    except ValueError:
        return {"error": "news or comission does not exist"}


header_functions = {"reg_user": reg_user,
                    "auth_user": find_user,
                    "get_comission_sent_tasks": get_comission_sent_tasks,
                    "get_actual_tasks_news": get_actual_tasks_news,
                    "get_comission_members": get_comission_members,
                    "check_sent_task": check_sent_task,
                    "add_task": add_task,
                    "add_news": add_news,
                    "get_task": get_task,
                    "send_task": send_task,
                    "delete_task": delete_task,
                    "delete_news": delete_news}

json_file = open("test_query.json", "r", encoding="utf-8")
data = json.load(json_file)
function = header_functions[data["function"]]
response = function(data["body"])

with open("response_file.json", "w", encoding="utf-8") as write_file:
    json.dump(response, write_file, ensure_ascii=False)
