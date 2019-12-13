from django.db import models
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pbServer.app.settings')


class User(models.Model):
    user_st = models.IntegerField(primary_key=True)
    last_name = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    course = models.SmallIntegerField()
    password = models.CharField(max_length=50, default='qwertyuiop')

    def __str__(self):
        return self.last_name + " " + self.first_name


class Comission(models.Model):
    name = models.CharField(primary_key=True, max_length=20)
    chairman = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Comission_member(models.Model):
    comission = models.ForeignKey(Comission, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comission.__str__() + " - " + self.user.__str__()


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    comission = models.ForeignKey(Comission, on_delete=models.CASCADE)
    task_title = models.CharField(max_length=200)
    task_description = models.CharField(max_length=2000)
    deadline = models.DateField()

    def __str__(self):
        return self.comission.__str__() + " - " + self.task_title


class Task_executor(models.Model):
    # id = models.AutoField(primary_key=True)
    task = models.OneToOneField(Task, on_delete=models.CASCADE)
    who_do = models.ForeignKey(User, on_delete=models.CASCADE, unique=False)
    is_sent = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return str(self.task.id) + " - " + self.who_do.__str__()


class News(models.Model):
    id = models.AutoField(primary_key=True)
    comission = models.ForeignKey(Comission, on_delete=models.CASCADE)
    news_title = models.CharField(max_length=200)
    news_description = models.CharField(max_length=2000)

    def __str__(self):
        return self.comission.__str__() + " - " + self.news_title


# user = User.objects.get(user_st=11111, password='')
# print(user)
# # registration
# User(user_st=61177, last_name='Крылова', first_name='Ольга', course=3).save()
#
# # auth
# def auth(user_st, password):
#     return User.objects.get(user_st=user_st, password=password) is not None
#

# # add comission
# chairman = User.objects.get(user_st=user_st)
# if chairman:
#     com = Comission(name=name, chairman=chairman)
#     com.save()
#     Comission_member(user=chairman, comission=com).save()
