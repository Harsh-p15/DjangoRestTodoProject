from rest_framework.routers import DefaultRouter
from . import views
from .views import TodoViewSet, UserCreate
from django.urls import path, include


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'todos', views.TodoViewSet, basename='todo')

#Combine the router's URLs with your custom URL
urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserCreate.as_view(), name='register'),
]


