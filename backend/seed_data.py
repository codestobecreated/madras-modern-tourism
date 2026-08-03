import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Location, TripType
from django.contrib.auth.models import User

def seed():
    print("Seeding database...")
    
    # Create Superuser if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Created superuser: admin / admin123")

    # Clear existing
    Location.objects.all().delete()
    TripType.objects.all().delete()

    # Create Parent Locations
    italy = Location.objects.create(
        name='Italy', 
        slug='italy', 
        subtitle='PLACES IN',
        listings_count=5,
        image_url='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        card_style='orange',
        order=1
    )
    Location.objects.create(name='Florence', slug='florence', parent=italy, subtitle='PLACES IN', listings_count=2, order=1)
    Location.objects.create(name='Rome', slug='rome', parent=italy, subtitle='TRAVEL TO', listings_count=2, image_url='https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80', order=2)
    Location.objects.create(name='Venice', slug='venice', parent=italy, subtitle='PLACES IN', listings_count=3, order=3)

    france = Location.objects.create(
        name='France', 
        slug='france', 
        subtitle='PLACES IN',
        listings_count=3,
        image_url='https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
        card_style='blue',
        order=2
    )

    maldives = Location.objects.create(
        name='Maldives', 
        slug='maldives', 
        subtitle='TRAVEL TO',
        listings_count=3,
        image_url='https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
        card_style='orange',
        order=3
    )

    iceland = Location.objects.create(
        name='Iceland', 
        slug='iceland', 
        subtitle='TRAVEL TO',
        listings_count=4,
        image_url='https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80',
        card_style='orange',
        order=4
    )

    japan = Location.objects.create(
        name='Japan', 
        slug='japan', 
        subtitle='PLACES IN',
        listings_count=6,
        image_url='https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
        card_style='blue',
        order=5
    )

    singapore = Location.objects.create(
        name='Singapore', 
        slug='singapore', 
        subtitle='TRAVEL TO',
        listings_count=4,
        image_url='https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
        card_style='orange',
        order=6
    )

    # Create Trip Types
    trip_types_data = [
        ('Adventure', 'adventure', 'fas fa-hiking'),
        ('Beache Tour', 'beache-tour', 'fas fa-umbrella-beach'),
        ('Cruise Tour', 'cruise-tour', 'fas fa-ship'),
        ('Nature Walks', 'nature-walks', 'fas fa-tree'),
        ('Paragliding', 'paragliding', 'fas fa-wind'),
        ('Wildlife Safari', 'wildlife-safari', 'fas fa-paw'),
    ]

    for idx, (name, slug, icon) in enumerate(trip_types_data, start=1):
        TripType.objects.create(name=name, slug=slug, icon=icon, order=idx)

    print("Seeding completed successfully!")

if __name__ == '__main__':
    seed()
