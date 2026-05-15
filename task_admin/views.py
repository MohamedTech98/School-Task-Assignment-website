from django.shortcuts import get_object_or_404, render, redirect
from .models import Task
from .forms import TaskForm
from authentication.models import User


def create_task_view(request):
    form = TaskForm()
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.admin = request.user      
            task.save()
            return redirect('dashboard')
    return render(request, 'Task_admin/create_task.html', {'form': form})


def edit_task_view(request, pk):
    task = get_object_or_404(Task, pk=pk)
    teachers = User.objects.filter(role='teacher')

    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)

        if form.is_valid():
            form.save()
            return redirect('dashboard')

    else:
        form = TaskForm(instance=task)

    return render(request, 'Task_admin/edit_task.html', {
        'form': form,
        'task': task,
        'teachers': teachers,
    })


def all_task_view(request):
    tasks = Task.objects.all()
    return render(request, 'Task_admin/all_task.html', {'tasks': tasks})


def delete_task(request, pk):
    Task.objects.filter(id=pk).delete()
    return redirect('dashboard')