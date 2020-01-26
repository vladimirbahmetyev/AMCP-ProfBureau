"""pbServer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
# from rest_framework import urls
from .views import *
from .gen_data import *

app_name = 'app'
urlpatterns = [
    path('api/admin/', admin.site.urls),
    # path('api/v1/pbsite', include('pbsite.urls')),
    path('api/registration/', registration),
    path('api/login/', login),
    path('api/get_personal_info/', get_personal_info),
    path('api/take_task/', take_task),
    path('api/send_task/', send_task),
    path('api/decline_task/', decline_task),
    path('api/add_task/', add_task),
    path('api/enter_or_leave_com/', enter_or_leave_com),

    path('api/gen_data/', gen_data),
    path('api/vk_login/', vk_login),
    path('api/vk_logout/', vk_logout),
    # path('api/test_lambda/', test_lambda),
    path('', index),
    path('', include('social_django.urls', namespace='social')),
    # path('api/vk_auth/', vk_auth)
    # url(r'', include('social_auth.urls')),
]
