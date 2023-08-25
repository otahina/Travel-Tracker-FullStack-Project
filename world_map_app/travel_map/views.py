from rest_framework import status
from rest_framework.response import Response
from .serializers import VisitedCountrySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import VisitedCountry

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def visited_countries(request):
    if request.method == 'POST':
        # Assuming request.data is a list
        countries = request.data
        # Iterate through the list and save each item using the serializer
        for country in countries:
            serializer = VisitedCountrySerializer(data=country)
            if serializer.is_valid():
                serializer.save(user=request.user)  # Include the user here
            else:
                # If any item is not valid, return an error response
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Countries saved successfully'}, status=status.HTTP_201_CREATED)
    elif request.method == 'GET':
        countries = VisitedCountry.objects.filter(user=request.user)
        serializer = VisitedCountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

