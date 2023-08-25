from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from travel_map.views import visited_countries

urlpatterns = [
    path('admin/', admin.site.urls),
    path('visited-countries/', visited_countries), 
    path('', RedirectView.as_view(url='/visited-countries/')),
    path('api-auth/', include('rest_framework.urls')),
    path('users/', include('users.urls')), 
]


admin.site.site_header = "My World Mark App Admin"
