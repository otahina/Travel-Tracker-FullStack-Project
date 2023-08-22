from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Create a username based on the email or use another logic that fits your needs
        username = email.split('@')[0]

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Get the user associated with the email
        user = User.objects.filter(email=email).first()
        if user:
            # Use Django's authenticate method
            user = authenticate(username=user.username, password=password)
            if user:
                return Response({
                    "message": "Login successful",
                    "username": user.username,  # Include the username in the response
                }, status=status.HTTP_200_OK)

        return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)