from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth.models import User
from  TodoProject import models
from .models import Todo
from . import models
from django.contrib.auth import authenticate,login,logout

def signup(request):
    if request.method =='POST':
        username = request.POST.get('username')
        emailid = request.POST.get('emailid')
        pwd = request.POST.get('pwd')
        print(username,emailid,pwd)
        my_user = User.objects.create_user(username,emailid,pwd)
        my_user.save()
        return redirect('/login')

    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        pwd = request.POST.get('pwd')
        print(username,pwd)
        user = authenticate(request,username = username, password = pwd)
        if user is not None:
            login(request,user)
            return redirect('/todopage')
        else:
            return redirect('/login')

    return render(request, 'login.html')

def todopage(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        print(title)
        obj = models.Todo(title = title, user = request.user)
        obj.save()
        res = models.Todo.objects.filter(user=request.user).order_by('-date')
        return redirect('/todopage',{'res':res})
    res = models.Todo.objects.filter(user=request.user).order_by('-date')
    return render(request, 'todopage.html', {'res':res})
 
def edit_todo(request, srno):
    # Get the todo object or 404
    obj = get_object_or_404(Todo, srno=srno)

    if request.method == 'POST':
        title = request.POST.get('title')
        if title:
            obj.title = title
            obj.save()
        return redirect('/todopage')  # Redirect after update

    # If GET request, render the edit page
    res = Todo.objects.all().order_by('-srno')  # Pass full todo list if needed
    return render(request, 'edit_todo.html', {'obj': obj, 'res': res})
     
def delete_todo(request,srno):
    print(srno)
    obj=models.Todo.objects.get(srno=srno)
    obj.delete()
    return redirect('/todopage')

def signout_view(request):
    logout(request)
    return redirect('/login/')
# Create your views here.
