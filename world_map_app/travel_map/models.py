from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

def default_user_function():
    return User.objects.get(username='default_user')

class VisitedCountry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=default_user_function)
    country_name = models.CharField(max_length=100)
    date_of_visit = models.DateField()

    def __str__(self):
        return self.country_name
