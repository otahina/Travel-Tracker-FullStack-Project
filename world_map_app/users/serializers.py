# Get a request from register.jsx

from django.contrib.auth import get_user_model
from rest_framework import serializers

#  takes JSON string and converts it into a Python dictionary
class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  

    # settings for the class
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'home_country')  

    # create a user
    def create(self, validated_data):
        # Overriding the create method to handle password hashing
        password = validated_data.pop('password')
        user = get_user_model().objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

