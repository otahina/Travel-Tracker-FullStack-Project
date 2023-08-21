from django.db import models

# for visited country
class VisitedCountry(models.Model):
    country_name = models.CharField(max_length=100)
    date_of_visit = models.DateField()
    # distingish from unvisited countries
    color = models.CharField(max_length=7, default="#FF0000")  # You can store the color as a HEX code

    def __str__(self):
        return self.country_name

