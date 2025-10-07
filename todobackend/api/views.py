from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.models import Todo
from .serializers import TodoSerializer, UserSerializer
from rest_framework import viewsets, permissions, generics
import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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



@csrf_exempt # Exempt this view from CSRF checks for our API
def login_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "message": "Login successful."})
        else:
            return JsonResponse({"success": False, "message": "Invalid credentials."}, status=400)
    
    return JsonResponse({"error": "Only POST method is allowed."}, status=405)