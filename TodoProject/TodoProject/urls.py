
from django.contrib import admin
from django.urls import path, include
from . import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.signup),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view),
    path('todopage/', views.todopage, name='todopage'),
    path('edit_todo/<int:srno>', views.edit_todo, name = 'edit_todo'),  
    path('delete_todo/<int:srno>', views.delete_todo, name = 'delete_todo'),  
    path('signout/', views.signout_view, name = "signout"),
    path('edit_todo/<int:srno>', views.edit_todo, name='edit_todo'),  
    path('delete_todo/<int:srno>', views.delete_todo, name='delete_todo'), 

   

]
