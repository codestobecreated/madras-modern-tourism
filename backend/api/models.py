from django.db import models


class SectionContent(models.Model):
    """
    Stores editable text for any homepage / landing-page section.
    key: a unique machine-readable identifier  e.g. 'destination_list'
    """
    key = models.SlugField(max_length=80, unique=True, help_text='Machine key, e.g. destination_list')
    tagline = models.CharField(max_length=120, blank=True, default='', help_text='Small pill label above the title')
    title = models.CharField(max_length=200, blank=True, default='', help_text='Main heading')
    description = models.TextField(blank=True, default='', help_text='Paragraph below the title')
    button_label = models.CharField(max_length=80, blank=True, default='', help_text='CTA button text')
    button_url = models.CharField(max_length=200, blank=True, default='#', help_text='CTA button URL')
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Section Content'
        verbose_name_plural = 'Section Contents'
        ordering = ['key']

    def __str__(self):
        return self.key

class Location(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='children'
    )
    subtitle = models.CharField(max_length=100, default='PLACES IN', blank=True)
    listings_count = models.IntegerField(default=3)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    card_style = models.CharField(max_length=20, default='orange', choices=[('orange', 'Orange Badge'), ('blue', 'Blue Card Accent')])
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Location'
        verbose_name_plural = 'Locations'

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} -> {self.name}"
        return self.name

class TripType(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, default='fas fa-hiking', blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Trip Type'
        verbose_name_plural = 'Trip Types'

    def __str__(self):
        return self.name
