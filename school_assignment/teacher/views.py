from django.utils import timezone

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from task_admin.models import Task


@login_required
def teacher_tasks(request):
    all_Tasks = Task.objects.filter(teacher=request.user)
    pending_Tasks = Task.objects.filter(teacher=request.user,is_completed=False)
    completed_Tasks = Task.objects.filter(teacher=request.user,is_completed=True)
    high_priority_tasks = pending_Tasks.filter(priority__iexact='High')
    return render(request,'Task_Teacher/TeacherTasks.html' ,{
        'alltasks': pending_Tasks,
        'totalassigned':all_Tasks.count(),
        'totalpending':pending_Tasks.count(),
        'totalcompleted':completed_Tasks.count(),
        'totalhighpriority':high_priority_tasks.count()
         })


@login_required
def completed(request):
    return render(request, 'Task_Teacher/Completed_tasks.html')


@login_required
def profile(request):
    return render(request, 'Task_Teacher/TeacherProfile.html')


@login_required
def details(request):
    return render(request, 'Task_Teacher/task_details.html')
