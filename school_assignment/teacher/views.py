from django.shortcuts import render

# Create your views here.

def dashboard(request):
    return render(request,'Task_Teacher/TeacherTasks.html')

def completed(request):
    return render(request, 'Task_Teacher/Completed_tasks.html')

def profile(request):
    return render(request, 'Task_Teacher/TeacherProfile.html')

def details(request):
    return render(request, 'Task_Teacher/task_details.html')