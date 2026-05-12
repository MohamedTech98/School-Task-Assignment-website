from django.contrib import messages
from django.contrib.auth import login, logout
from django.shortcuts import redirect, render

from .forms import LoginForm, RegistrationForm


def get_role_dashboard(user):
    if user.role == 'admin':
        return 'admin:index'
    return 'teacher_tasks'


def home_view(request):
    if request.user.is_authenticated:
        return redirect(get_role_dashboard(request.user))
    return render(request, 'index.html')


def register_view(request):
    if request.user.is_authenticated:
        return redirect(get_role_dashboard(request.user))

    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
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
