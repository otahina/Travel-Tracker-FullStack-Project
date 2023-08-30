from rest_framework import status
from rest_framework.response import Response
from .serializers import VisitedCountrySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import VisitedCountry
from django.contrib.auth import get_user_model

# GET for retrieving data from the server, POST for sendind data to the server to update data.
# PATCH for partial update to data in the server
@api_view(['GET', 'POST', 'PATCH'])
@permission_classes([IsAuthenticated])
def visited_countries(request):
    # For updating list of visited countries
    if request.method == 'POST':
        countries = request.data
        # Delete the existing countries for the user
        VisitedCountry.objects.filter(user=request.user).delete()
        # Iterate through the list and save each item using the serializer
        for country in countries:
            # Attempt to update or create a new record
            serializer = VisitedCountrySerializer(data=country)
            if serializer.is_valid():
                VisitedCountry.objects.update_or_create(user=request.user, country_name=country['country_name'],
                                                        defaults={'date_of_visit': country.get('date_of_visit', None)})
            else:
                # If any item is not valid, return an error response
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Countries saved successfully'}, status=status.HTTP_201_CREATED)
    # For retrieving the list of visited countries
    elif request.method == 'GET':
        countries = VisitedCountry.objects.filter(user=request.user)
        country_count = countries.count()  # Count the number of visited countries
        serializer = VisitedCountrySerializer(countries, many=True)
        return Response({
        'count': country_count, # Include the count in the response
        'countries': serializer.data
        }, status=status.HTTP_200_OK)
    
    # For updating home country data
    elif request.method == 'PATCH':
        new_home_country = request.data.get('home_country', None)

        if new_home_country is None:
            return Response({'error': 'Home country not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update the home_country field for the authenticated user
        user = request.user
        user.home_country = new_home_country
        user.save()

        return Response({'message': 'Home country updated successfully'}, status=status.HTTP_200_OK)
    
    else:
        return Response({'error': 'Method not supported'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

