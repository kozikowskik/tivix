from rest_framework import viewsets
from django.contrib.auth.models import User

from .serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return super().get_queryset().exclude(pk=self.request.user.pk)
