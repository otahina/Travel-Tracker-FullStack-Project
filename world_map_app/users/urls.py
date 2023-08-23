from django.urls import path
from .views import SignupView, LoginView

urlpatterns = [
    path('register/', SignupView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
