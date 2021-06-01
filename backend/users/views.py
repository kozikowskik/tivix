from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView

from .serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    paginator = None

    def get_queryset(self):
        return super().get_queryset().exclude(pk=self.request.user.pk)
