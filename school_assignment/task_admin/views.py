from django.shortcuts import render
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializers
# Create your views here.

# using ListCreateAPIView to handle both method get and post

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializers

class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializers
    lookup_field = "pk"



# def dashboard_view(request):
#     return render(request,'Task_admin/Dashboard.html')

# def create_task_view(request):
#     return render(request,'Task_admin/create_task.html')
