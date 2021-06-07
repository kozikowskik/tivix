from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from budgets.views import BudgetViewSet, TransactionViewSet
from categories.views import CategoryViewSet
from users.views import UserViewSet
from .views import settings_view

router = DefaultRouter(trailing_slash=False)

router.register("budgets", BudgetViewSet)
router.register("transactions", TransactionViewSet)
router.register("categories", CategoryViewSet)
router.register("users", UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("api/", include(router.urls)),
    path("api/settings", settings_view),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
