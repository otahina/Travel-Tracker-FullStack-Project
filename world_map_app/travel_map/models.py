from django.db import models
from django.conf import settings


class VisitedCountry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country_name = models.CharField(max_length=100)
    date_of_visit = models.DateField(null=True)

    def __str__(self):
        return self.country_name
