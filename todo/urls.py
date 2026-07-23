from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, RegisterView

router = DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]

