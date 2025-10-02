from django.http import HttpResponse

def login_view(request):
    return HttpResponse("<h1>Login Page</h1><p>The server is running!</p>")

def signup(request):
    return HttpResponse("<h1>Signup Page</h1>")

def todopage(request):
    return HttpResponse("<h1>Todo Page</h1>")

def edit_todo(request, srno):
    return HttpResponse(f"<h1>Editing Todo #{srno}</h1>")

def delete_todo(request, srno):
    return HttpResponse(f"<h1>Deleting Todo #{srno}</h1>")

def signout_view(request):
    return HttpResponse("<h1>Signing Out</h1>")