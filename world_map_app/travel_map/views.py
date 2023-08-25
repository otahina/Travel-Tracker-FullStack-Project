from rest_framework import status
from rest_framework.response import Response
from .serializers import VisitedCountrySerializer
from rest_framework.decorators import api_view
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_visited_countries(request):
    user = request.user
    countries = request.data
    if not isinstance(countries, list):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        for country_data in countries:
            country_data['user'] = user.id
            serializer = VisitedCountrySerializer(data=country_data)
            if serializer.is_valid(raise_exception=True): # This will throw an exception if there's an error
                serializer.save()

    return Response(status=status.HTTP_201_CREATED)

