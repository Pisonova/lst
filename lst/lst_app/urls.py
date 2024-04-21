from django.urls import path
from lst_app.views import login

urlpatterns = [
    path('login', login)
]
