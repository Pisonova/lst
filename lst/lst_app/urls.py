from django.urls import path
from lst_app.views import login, register, load, get_event, register_event

urlpatterns = [
    path('login', login),
    path('registration/<int:id>', get_event),
    path('register', register),
    path('', load),
    path('register_event', register_event),
]
