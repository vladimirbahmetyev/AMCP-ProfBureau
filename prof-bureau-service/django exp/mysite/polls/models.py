from django.db import models


class User(models.Model):
    user_st = models.IntegerField(primary_key=True)
    last_name = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    course = models.SmallIntegerField()
    password = models.CharField(max_length=50, default='qwertyuiop')


class Comission(models.Model):
    name = models.CharField(primary_key=True, max_length=20)
    chairman = models.OneToOneField(User, on_delete=models.CASCADE)


class Comission_member(models.Model):
    comission = models.ForeignKey(Comission, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    comission = models.ForeignKey(Comission, on_delete=models.CASCADE)
    task_title = models.CharField(max_length=200)
    task_description = models.CharField(max_length=2000)
    deadline = models.DateTimeField()


class Task_executor(models.Model):
    task = models.OneToOneField(Task, on_delete=models.CASCADE)
    who_do = models.OneToOneField(User, on_delete=models.CASCADE)
    is_sent = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)


class News(models.Model):
    id = models.AutoField(primary_key=True)
    comission = models.ForeignKey(Comission, on_delete=models.CASCADE)
    news_title = models.CharField(max_length=200)
    news_description = models.CharField(max_length=2000)


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






