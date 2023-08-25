from rest_framework import serializers
from .models import VisitedCountry

class VisitedCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitedCountry
        fields = ['country_name']
