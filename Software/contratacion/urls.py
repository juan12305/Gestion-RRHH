from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContratacionViewSet

router = DefaultRouter()
router.register(r'contrataciones', ContratacionViewSet, basename='contratacion')

urlpatterns = [
    path('', include(router.urls)),
]
