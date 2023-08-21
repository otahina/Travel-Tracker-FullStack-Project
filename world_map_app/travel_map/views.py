from django.shortcuts import render
from rest_framework import generics
from .models import VisitedCountry
from .serializers import VisitedCountrySerializer

class VisitedCountryList(generics.ListCreateAPIView):
    queryset = VisitedCountry.objects.all()
    serializer_class = VisitedCountrySerializer