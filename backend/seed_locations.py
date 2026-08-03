"""
Seed Tamil Nadu / Madras Modern Tourism location data.
Run: python manage.py shell < seed_locations.py
Or:  python seed_locations.py  (from backend dir with Django configured)
"""
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Location

# Remove old top-level locations so we start clean
Location.objects.filter(parent__isnull=True).delete()
print("Old top-level locations deleted.")

locations = [
    {
        "name": "Chennai",
        "slug": "chennai",
        "subtitle": "PLACES IN",
        "listings_count": 8,
        "card_style": "orange",
        "order": 1,
        "image_url": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    },
    {
        "name": "Mahabalipuram",
        "slug": "mahabalipuram",
        "subtitle": "TRAVEL TO",
        "listings_count": 5,
        "card_style": "blue",
        "order": 2,
        "image_url": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    },
    {
        "name": "Ooty",
        "slug": "ooty",
        "subtitle": "EXPLORE",
        "listings_count": 6,
        "card_style": "orange",
        "order": 3,
        "image_url": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    },
    {
        "name": "Rameswaram",
        "slug": "rameswaram",
        "subtitle": "PLACES IN",
        "listings_count": 4,
        "card_style": "orange",
        "order": 4,
        "image_url": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
    },
    {
        "name": "Kodaikanal",
        "slug": "kodaikanal",
        "subtitle": "TRAVEL TO",
        "listings_count": 5,
        "card_style": "blue",
        "order": 5,
        "image_url": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=600&q=80",
    },
    {
        "name": "Madurai",
        "slug": "madurai",
        "subtitle": "EXPLORE",
        "listings_count": 7,
        "card_style": "orange",
        "order": 6,
        "image_url": "https://images.unsplash.com/photo-1562832135-14a35d25edef?auto=format&fit=crop&w=600&q=80",
    },
]

for d in locations:
    loc, created = Location.objects.update_or_create(
        slug=d["slug"],
        defaults={**d, "is_active": True, "is_featured": True},
    )
    status = "Created" if created else "Updated"
    print(f"  {status}: {loc.name} (id={loc.id})")

print(f"\nDone. Total locations in DB: {Location.objects.count()}")
