from django.urls import path
from lst_app.views import login, register, load

urlpatterns = [
    path('login', login),
    path('register', register),
    path('', load)
]
