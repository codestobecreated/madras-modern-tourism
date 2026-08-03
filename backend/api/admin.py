from django.contrib import admin
from .models import Location, TripType, SectionContent


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'subtitle', 'listings_count', 'card_style', 'parent', 'is_featured', 'is_active', 'order')
    list_filter = ('is_active', 'is_featured', 'card_style', 'parent')
    search_fields = ('name', 'slug', 'subtitle')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('subtitle', 'listings_count', 'card_style', 'is_featured', 'is_active', 'order')

@admin.register(TripType)
class TripTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_active', 'order')


@admin.register(SectionContent)
class SectionContentAdmin(admin.ModelAdmin):
    list_display = ('key', 'tagline', 'title', 'button_label', 'is_active')
    list_editable = ('tagline', 'title', 'button_label', 'is_active')
    search_fields = ('key', 'title', 'tagline')
