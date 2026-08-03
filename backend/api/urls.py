from django.urls import path
from .views import hero_filters_api, locations_list_api, section_content_api

urlpatterns = [
    path('hero-filters/', hero_filters_api, name='hero_filters_api'),
    path('locations/', locations_list_api, name='locations_list_api'),
    path('section-content/', section_content_api, name='section_content_api'),
]
