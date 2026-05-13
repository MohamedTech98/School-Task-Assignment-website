from django.urls import path
from .views import TaskListCreateView, TaskRetrieveUpdateDestroyView

urlpatterns = [
    path('create/', TaskListCreateView.as_view(), name='task-list-create'),
    path('edit/<str:pk>/', TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),
]