from rest_framework import viewsets

from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def destroy(self, request, pk=None):
        super().destroy(request, pk)
        return self.list(request)
