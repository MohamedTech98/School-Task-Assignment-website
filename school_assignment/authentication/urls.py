from django.urls import path

from . import views

urlpatterns = [
    path('', views.home_view, name='Home'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('create-task/', views.admin_create_task, name='admin_create_task'),
    path('all-tasks/', views.admin_all_task, name='admin_all_task'),
    path('edit-task/', views.admin_edit_task, name='admin_edit_task'),
]
