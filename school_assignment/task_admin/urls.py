from django.urls import path
from .views import *

urlpatterns = [
    path('create/', create_task_view, name='create'),
    path('all/', all_task_view, name='all'),
    path('edit/<int:pk>/', edit_task_view, name='edit'),
    path('delete/<int:pk>/', delete_task, name='delete'),
]