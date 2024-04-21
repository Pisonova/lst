from django.contrib import admin

from .models import CustomUser, Event, Program_registration, Event_registration, Program, Program_type, Role, Role_type, Feedback, Accomodation_date, Attendance

class PRAdmin(admin.ModelAdmin):
    list_display = ('user', 'program')

class ERAdmin(admin.ModelAdmin):
    list_display = ('user', 'event')

class ADAdmin(admin.ModelAdmin):
    list_display = ('start', 'end')

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("user", 'event', 'program')

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'start', 'end', 'visible')

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'program', 'points')

class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'program_type', 'start', 'end', 'visible')

class RoleAdmin(admin.ModelAdmin):
    list_display = ('role_type', 'event') 

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'first_name', 'surname', 'email')   

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Program_registration, PRAdmin)
admin.site.register(Event_registration, ERAdmin)
admin.site.register(Program, ProgramAdmin)
admin.site.register(Program_type)
admin.site.register(Role, RoleAdmin)
admin.site.register(Role_type)
admin.site.register(Attendance, AttendanceAdmin)
admin.site.register(Accomodation_date, ADAdmin)
admin.site.register(Feedback, FeedbackAdmin)
