from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view()
def settings_view(request):
    return Response({"PAGE_SIZE": settings.REST_FRAMEWORK["PAGE_SIZE"]})
