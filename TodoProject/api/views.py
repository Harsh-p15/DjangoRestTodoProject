from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from TodoProject.models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):

    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the todos
        for the currently authenticated user.
        """
        user = self.request.user
        return Todo.objects.filter(user=user).order_by('-date')

    def perform_create(self, serializer):
        """
        Assign the current user to the todo item when it's created.
        """
        serializer.save(user=self.request.user)

# Create your views here.
