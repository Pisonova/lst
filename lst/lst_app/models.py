from django.db import models

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
    pass

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


class User(models.Model):
    first_name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    user_name = models.CharField(max_length=15, unique=True)
    email = models.CharField(max_length=30)
    roles = models.ManyToManyField(Role, blank=True)


class Program(Action):
    program_type = models.ForeignKey(Program_type, on_delete=models.CASCADE)
    organizers = models.ForeignKey(User, on_delete=models.CASCADE)
    events = models.ManyToManyField(Event, blank=True)

    def __str__(self):
        return self.name + ' (' + str(self.program_type) + ')'

class Program_registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

class Event_registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    lunches = models.IntegerField(blank=True, null=True)
    accomodation_dates = models.ManyToManyField(Accomodation_date, blank=True)

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateTimeField('day', blank=True, null=True)


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, blank=True, null=True)
    points = models.IntegerField()
    comment = models.CharField(max_length=5000, blank=True, null=True)