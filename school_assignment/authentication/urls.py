from django.urls import path
from .views import home_view,login_view

urlpatterns = [
    path('',home_view,name='Home'),
    path('login/',login_view,name = 'Login')
]