from database import *
import json
# from pony import orm


@db_session
def get_table(table_name, name_str):
    strings = select(string for string in table_name)[:]
    res = {name_str: [string.to_dict() for string in strings]}
    print(json.dumps(res, ensure_ascii=False))


@db_session
def find_user(data):
    try:
        found_user = User.get(user_st=data["login"], password=data["password"])
        dict_data = {"found": True,
                     "st": found_user.user_st,
                     "name": found_user.first_name,
                     "surname": found_user.last_name,
                     "course": found_user.course}
        with open("response_file.json", "w", encoding="utf-8") as write_file:
            json.dump(dict_data, write_file, ensure_ascii=False)
    except AttributeError:
        with open("response_file.json", "w") as write_file:
            json.dump({"found": False}, write_file)


@db_session
def get_comission_tasks(data):
    try:
        comission_name = data["name"]
        tasks = Task.select(lambda t: t.comission.name == comission_name)
        task_strings = select(string for string in tasks)[:]
        tasks_array = []
        for task in task_strings:
            executor = Task_executor.get(task=task).who_do
            tasks_array.append({"title": task.title,
                                "description": task.description,
                                "deadline": str(task.deadline),
                                "executor_st": executor.user_st})
        res = {"found": True,
               "tasks": tasks_array}
        with open("response_file.json", "w", encoding="utf-8") as write_file:
            json.dump(res, write_file, ensure_ascii=False)
    except AttributeError:
        with open("response_file.json", "w") as write_file:
            json.dump({"found": False}, write_file)


@db_session
def get_users_tasks(data):
    try:
        user_st = User[data["user_st"]].user_st
        executor_tasks = Task_executor.select(lambda t: t.who_do.user_st == user_st)
        executor_strings = select(string for string in executor_tasks)[:]
        tasks_array = []
        for string in executor_strings:
            task = string.task
            tasks_array.append(({"title": task.title,
                                 "description": task.description,
                                 "deadline": str(task.deadline),
                                 "is_sent": string.is_sent}))
        res = {"found": True,
               "tasks": tasks_array}
        with open("response_file.json", "w", encoding="utf-8") as write_file:
            json.dump(res, write_file, ensure_ascii=False)
    except AttributeError:
        with open("response_file.json", "w") as write_file:
            json.dump({"found": False}, write_file)


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
        res = {"found": True,
               "tasks": tasks_array}
        with open("response_file.json", "w", encoding="utf-8") as write_file:
            json.dump(res, write_file, ensure_ascii=False)
    except AttributeError:
        with open("response_file.json", "w") as write_file:
            json.dump({"found": False}, write_file)


header_functions = {"auth_user": find_user,
                    "get_comission_tasks": get_comission_tasks,
                    "get_users_tasks": get_users_tasks,
                    "get_comission_sent_tasks": get_comission_sent_tasks}

json_file = open("test_query.json", "r", encoding="utf-8")
data = json.load(json_file)
function = header_functions[data["function"]]
function(data["body"])


# get_table(User, 'users')
# find_user()
# get_comission_tasks()
