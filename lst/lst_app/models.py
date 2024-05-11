from django.db import models
from django.contrib.auth.models import User

class Accomodation_date(models.Model):
    start = models.DateField("from")
    end = models.DateField("to")

    def __str__(self):
        return 'od ' + str(self.start) + ' do ' + str(self.end)

class Action(models.Model):
    name = models.CharField(max_length=200)
    visible = models.BooleanField(default=False)
    start = models.DateTimeField("event start")
    end = models.DateTimeField("event end")
    registration_start = models.DateTimeField("registration start", blank=True, null=True)
    registration_end = models.DateTimeField("registration end", blank=True, null=True)
    more_info = models.CharField(max_length=1000, blank=True, null=True)

    class Meta: 
        abstract = True

class Event(Action):
    accomodation_dates = models.ManyToManyField(Accomodation_date, blank=True)

    def __str__(self):
        return self.name

class Program_type(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Role_type(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Role(models.Model):
    role_type = models.ForeignKey(Role_type, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.role_type)


class CustomUser(models.Model):
    roles = models.ManyToManyField(Role, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def user_name(self):
        return self.user.username

    def first_name(self):
        return self.user.first_name

    def surname(self):
        return self.user.last_name

    def email(self):
        return self.user.email

    def __str__(self):
        return self.user_name()

class Program(Action):
    program_type = models.ForeignKey(Program_type, on_delete=models.CASCADE)
    organizers = models.ManyToManyField(CustomUser, blank=True)
    events = models.ManyToManyField(Event, blank=True)

    def __str__(self):
        return self.name + ' (' + str(self.program_type) + ')'

class Program_registration(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

class Event_registration(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    lunches = models.IntegerField(blank=True, null=True)
    accomodation_dates = models.ManyToManyField(Accomodation_date, blank=True)

class Attendance(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateTimeField('day', blank=True, null=True)

class Feedback(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, blank=True, null=True)
    points = models.IntegerField()
    comment = models.CharField(max_length=5000, blank=True, null=True)