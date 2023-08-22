from django.contrib.auth.models import User
from django.db import models

class VisitedCountry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # Associate with a user
    country_name = models.CharField(max_length=100)
    date_of_visit = models.DateField()
    color = models.CharField(max_length=7, default="#FF0000")

    def __str__(self):
        return self.country_name

