from django.conf import settings
from django.http import HttpResponse


class SimpleCorsMiddleware:
    """
    Minimal CORS support for the public JSON API, so the Next.js frontend
    (a different origin in development) can call /api/ from the browser.
    Honours CORS_ALLOW_ALL_ORIGINS / CORS_ALLOWED_ORIGINS from settings.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.startswith('/api/'):
            return self.get_response(request)

        if request.method == 'OPTIONS':
            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)

        origin = request.headers.get('Origin')
        allowed = getattr(settings, 'CORS_ALLOWED_ORIGINS', [])
        if origin and (getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', False) or origin in allowed):
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Content-Type'
            response['Vary'] = 'Origin'
        return response
