from django.urls import path
from .views import SignupView, LoginView, LogoutView, UserProfileView, HomeCountryView

urlpatterns = [
    path('register/', SignupView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('home-country/', HomeCountryView.as_view(), name='home-country'),
]

