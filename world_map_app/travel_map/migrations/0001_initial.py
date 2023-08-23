# Generated by Django 4.2.4 on 2023-08-23 02:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import travel_map.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VisitedCountry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country_name', models.CharField(max_length=100)),
                ('date_of_visit', models.DateField()),
                ('user', models.ForeignKey(default=travel_map.models.default_user_function, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
