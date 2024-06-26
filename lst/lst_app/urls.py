from django.urls import path
from lst_app.views import *  

urlpatterns = [
    path('login', login),
    path('registration/<int:id>', get_event),
    path('register', register),
    path('', load),
    path('getProgram/<int:id>', get_program),
    path('update_program/<int:id>', update_program),
    path('register_event', register_event),
    path('archive', load_old),
    path('myevents', load_my_events),
    path('add_feedback', add_feedback),
    path('programs/<int:id>', get_programs),
    path('myprograms', load_my_programs),
    path('<str:type>/<int:id>', get_action),
    path('register_program', register_program),
    path('logout/<str:aType>/<int:id>', logout),
    path('feedbacks/<str:aType>/<int:id>', get_feedbacks),
    path('registered/<str:aType>/<int:id>', get_registered),
    path('getactions',get_actions),
    path('add_program', add_program),
    path('getProgramTypes', get_pts),
    path('getOrganizers', get_orgs),
    path('getEvents', get_events),
]
