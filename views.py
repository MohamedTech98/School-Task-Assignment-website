from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
def teacher_tasks(request):
    return render(request, 'Task_Teacher/TeacherTasks.html')


@login_required
def completed(request):
    return render(request, 'Task_Teacher/Completed_tasks.html')


@login_required
def profile(request):
    return render(request, 'Task_Teacher/TeacherProfile.html')


@login_required
def details(request):
    return render(request, 'Task_Teacher/task_details.html')
