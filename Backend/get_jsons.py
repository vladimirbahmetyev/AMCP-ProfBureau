from database import *
import json
# from pony import orm


@db_session
def get_table(table_name, name_str):
    strings = select(string for string in table_name)[:]
    res = {name_str: [string.to_dict() for string in strings]}
    print(json.dumps(res, ensure_ascii=False))


@db_session
def find_user():
    json_file = open("auth_query.json", "r")
    data = json.load(json_file)
    try:
        found_user = User.get(user_st=data["login"], password=data["password"])
        dict_data = {"found": True,
                     "st": found_user.user_st,
                     "name": found_user.first_name,
                     "surname": found_user.last_name,
                     "course": found_user.course}
        print(json.dumps(dict_data, ensure_ascii=False))
    except AttributeError:
        dict_data = {"found": False}
        print(json.dumps(dict_data))


@db_session
def get_comission_tasks():
    json_file = open("get_comission_tasks.json", "r")
    data = json.load(json_file)
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
                                "executor": executor.user_st})
        res = {"found": True,
               "tasks": tasks_array}
        print(json.dumps(res, ensure_ascii=False))
    except AttributeError:
        dict_data = {"found": False}
        print(json.dumps(dict_data))


# get_table(User, 'users')
# find_user()
# get_comission_tasks()
