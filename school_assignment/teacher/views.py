from datetime import timezone

from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from task_admin.models import Task


@login_required
def teacher_tasks(request):
    all_Tasks = Task.objects.filter(teacher=request.user)
    pending_Tasks = Task.objects.filter(teacher=request.user,is_completed=False)
    completed_Tasks = Task.objects.filter(teacher=request.user,is_completed=True)
    high_priority_tasks = pending_Tasks.filter(priority__iexact='High')
    return render(request,'Task_Teacher/TeacherTasks.html' ,{
        'alltasks': all_Tasks,
        'totalassigned':all_Tasks.count(),
        'totalpending':pending_Tasks.count(),
        'totalcompleted':completed_Tasks.count(),
        'totalhighpriority':high_priority_tasks.count()
         })


@login_required
def completed(request):
    all_tasks = Task.objects.filter(teacher=request.user)
    completed_tasks = all_tasks.filter(is_completed=True).order_by('-completed_at')
    pending_tasks = all_tasks.filter(is_completed=False)
 
    total = all_tasks.count()
    total_completed = completed_tasks.count()
    total_pending = pending_tasks.count()
    completion_rate = round((total_completed / total) * 100) if total > 0 else 0
 
    return render(request, 'Task_Teacher/Completed_tasks.html', {
        'completed_tasks': completed_tasks,
        'total_completed': total_completed,
        'total_pending': total_pending,
        'completion_rate': completion_rate,
        'show_celebration': total_completed >= 3,
    })
    
@login_required
def complete_task(request, pk):
    task = get_object_or_404(Task, id=pk, teacher=request.user)
    task.is_completed = True
    task.completed_at = timezone.now()  
    task.save()
    return redirect('teacher_tasks')

@login_required
def profile(request):
    return render(request, 'Task_Teacher/TeacherProfile.html')

@login_required
def details(request, pk):
    task = get_object_or_404(Task, id=pk, teacher=request.user)

    if request.method == 'POST':
        status = request.POST.get('status')

        if status == 'completed':
            task.is_completed = True
            task.completed_at = timezone.now()
        else:
            task.is_completed = False
            task.completed_at = None

        task.save()

    return render(request, 'Task_Teacher/task_details.html', {
        'task': task
    })