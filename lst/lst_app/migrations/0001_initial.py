# Generated by Django 5.0.3 on 2024-04-20 11:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Accomodation_date',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateField(verbose_name='from')),
                ('end', models.DateField(verbose_name='to')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('visible', models.BooleanField(default=False)),
                ('start', models.DateTimeField(verbose_name='event start')),
                ('end', models.DateTimeField(verbose_name='event end')),
                ('registration_start', models.DateTimeField(blank=True, null=True, verbose_name='registration start')),
                ('registration_end', models.DateTimeField(blank=True, null=True, verbose_name='registration end')),
                ('more_info', models.CharField(blank=True, max_length=1000, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Program_type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Role_type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('visible', models.BooleanField(default=False)),
                ('start', models.DateTimeField(verbose_name='event start')),
                ('end', models.DateTimeField(verbose_name='event end')),
                ('registration_start', models.DateTimeField(blank=True, null=True, verbose_name='registration start')),
                ('registration_end', models.DateTimeField(blank=True, null=True, verbose_name='registration end')),
                ('more_info', models.CharField(blank=True, max_length=1000, null=True)),
                ('events', models.ManyToManyField(blank=True, to='lst_app.event')),
                ('program_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.program_type')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lst_app.event')),
                ('role_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.role_type')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('surname', models.CharField(max_length=30)),
                ('user_name', models.CharField(max_length=15, unique=True)),
                ('email', models.CharField(max_length=30)),
                ('roles', models.ManyToManyField(blank=True, to='lst_app.role')),
            ],
        ),
        migrations.CreateModel(
            name='Program_registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.program')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.user')),
            ],
        ),
        migrations.AddField(
            model_name='program',
            name='organizers',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.user'),
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.IntegerField()),
                ('comment', models.CharField(blank=True, max_length=5000, null=True)),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lst_app.event')),
                ('program', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lst_app.program')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lst_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Event_registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lunches', models.IntegerField(blank=True, null=True)),
                ('accomodation_dates', models.ManyToManyField(blank=True, to='lst_app.accomodation_date')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, null=True, verbose_name='day')),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lst_app.event')),
                ('program', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lst_app.program')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lst_app.user')),
            ],
        ),
    ]
