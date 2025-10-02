from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models import Todo
from .serializers import TodoSerializer, UserSerializer
from rest_framework import viewsets, permissions, generics

class TodoViewSet(viewsets.ModelViewSet): #inheriting from viewsets.ModelViewSet get put post delete methods

    serializer_class = TodoSerializer #TodoSerializer as translator
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

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
