from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(User)
admin.site.register(Comission)
admin.site.register(Comission_member)
admin.site.register(Task)
admin.site.register(Task_executor)
admin.site.register(News)
