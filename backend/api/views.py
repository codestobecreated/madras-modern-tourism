from django.http import JsonResponse
from .models import Location, TripType, SectionContent


def hero_filters_api(request):
    """
    Returns JSON endpoint for Locations and Trip Types for the search bar and destination carousel.
    """
    # Fetch top-level locations (parent is None)
    top_locations = Location.objects.filter(is_active=True, parent__isnull=True).prefetch_related('children')
    
    locations_data = []
    for loc in top_locations:
        children = loc.children.filter(is_active=True)
        children_data = [
            {
                "id": child.id,
                "name": child.name,
                "slug": child.slug,
                "subtitle": child.subtitle,
                "listings_count": child.listings_count,
                "image_url": child.image_url,
                "card_style": child.card_style,
                "is_featured": child.is_featured,
            }
            for child in children
        ]
        locations_data.append({
            "id": loc.id,
            "name": loc.name,
            "slug": loc.slug,
            "subtitle": loc.subtitle,
            "listings_count": loc.listings_count,
            "image_url": loc.image_url,
            "card_style": loc.card_style,
            "is_featured": loc.is_featured,
            "children": children_data
        })

    # Fetch trip types
    trip_types = TripType.objects.filter(is_active=True)
    trip_types_data = [
        {
            "id": tt.id,
            "name": tt.name,
            "slug": tt.slug,
            "icon": tt.icon
        }
        for tt in trip_types
    ]

    return JsonResponse({
        "status": "success",
        "locations": locations_data,
        "trip_types": trip_types_data
    })


def locations_list_api(request):
    """
    Dedicated endpoint for the Destination Carousel.
    Returns featured top-level Locations that have an image URL, ordered by 'order'.
    """
    locations = (
        Location.objects
        .filter(is_active=True, is_featured=True, parent__isnull=True)
        .order_by('order', 'name')
    )

    data = [
        {
            "id": loc.id,
            "name": loc.name,
            "slug": loc.slug,
            "subtitle": loc.subtitle,
            "listings_count": loc.listings_count,
            "image_url": loc.image_url or "",
            "card_style": loc.card_style,
        }
        for loc in locations
    ]

    return JsonResponse({"status": "success", "locations": data})


def section_content_api(request):
    """
    Returns the editable text content for a page section.
    GET /api/section-content/?key=destination_list
    """
    key = request.GET.get("key", "").strip()
    if not key:
        return JsonResponse({"status": "error", "message": "key parameter required"}, status=400)

    try:
        section = SectionContent.objects.get(key=key, is_active=True)
        return JsonResponse({
            "status": "success",
            "key": section.key,
            "tagline": section.tagline,
            "title": section.title,
            "description": section.description,
            "button_label": section.button_label,
            "button_url": section.button_url,
        })
    except SectionContent.DoesNotExist:
        return JsonResponse({"status": "not_found"}, status=404)
