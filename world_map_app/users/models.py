from django.contrib.auth.models import AbstractUser
from django.db import models

# Degine the structure of object(user)
# using built-in AbstractUser class. 
class CustomUser(AbstractUser):
    home_country = models.CharField(max_length=50, null=True, blank=True)
