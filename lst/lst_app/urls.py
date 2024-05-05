from django.urls import path
from lst_app.views import *  # login, register, load, get_event, register_event, load_old, load_my_events, add_feedback

urlpatterns = [
    path('login', login),
    path('registration/<int:id>', get_event),
    path('register', register),
    path('', load),
    path('register_event', register_event),
    path('archive', load_old),
    path('myevents', load_my_events),
    path('add_feedback', add_feedback),
    path('programs/<int:id>', get_programs),
    path('<str:type>/<int:id>', get_action),
    path('register_program', register_program),
]
