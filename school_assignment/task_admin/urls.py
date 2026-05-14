from django.urls import path
from .views import *

urlpatterns = [
    path('api/create/', TaskListCreateView.as_view(), name='task-list-create'),
    path('edit/<str:pk>/', TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),
]