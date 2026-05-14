from django.urls import path
from .views import *

urlpatterns = [
    path('', teacher_tasks, name='teacher_tasks'),
    path('completed/', completed, name='completed'),
    path('profile/', profile, name='profile'),
    path('details/', details, name='details'),
    path('complete/<int:pk>/', complete_task, name='complete_task'),
]
