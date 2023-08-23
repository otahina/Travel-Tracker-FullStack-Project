from django.contrib import admin
from django.urls import path, include, re_path
from travel_map.views import VisitedCountryList
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('visited-countries/', VisitedCountryList.as_view()),  
    path('', RedirectView.as_view(url='/visited-countries/')),
    path('api-auth/', include('rest_framework.urls')),
    path('users/', include('users.urls')), 
    path('user_profile/', include('user_profile.urls')), 
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(templatename='index.html'))]

admin.site.site_header = "My World Mark App Admin"
