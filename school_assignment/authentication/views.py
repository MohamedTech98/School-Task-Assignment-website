from django.db.models import Count
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from task_admin.models import Task

from .forms import LoginForm, RegistrationForm


def get_role_dashboard(user):
    if user.role == 'admin':
        return 'dashboard'
    return 'teacher_tasks'


def home_view(request):
    # if request.user.is_authenticated:
    #     return redirect(get_role_dashboard(request.user))
    return render(request, 'index.html')


def register_view(request):
    if request.user.is_authenticated:
        return redirect(get_role_dashboard(request.user))

    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            if user.role == 'admin':
                user.is_staff = True
                user.is_superuser = True
                user.save()
            login(request, user)
            messages.success(request, f'Account created successfully! Welcome, {user.username}.')
            return redirect(get_role_dashboard(user))
        messages.error(request, 'Please correct the errors below.')

    return render(request, 'Login_Sign/Signup.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect(get_role_dashboard(request.user))

    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            if user.role == 'admin' and not user.is_staff:
                user.is_staff = True
                user.is_superuser = True
                user.save()
            login(request, user)
            messages.success(request, f'Welcome back, {user.username}!')
            next_url = request.GET.get('next')
            return redirect(next_url or get_role_dashboard(user))
        messages.error(request, 'Invalid username or password.')

    return render(request, 'Login_Sign/Login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out successfully.')
    return redirect('login')


@login_required
def admin_dashboard(request):
    mytask = Task.objects.filter(
        admin = request.user
    )
    prioirty_high = Task.objects.filter(priority = 'high').count()
    total_task = Task.objects.all().count()

    return render(request, 'Task_admin/Dashboard.html',{
        'mytask':mytask,
        'priority_high':prioirty_high,
        'total_task':total_task,
        }
        )