from django.urls import path
from .views import *

urlpatterns = [
    path('',dashboard,name='dashboard'),
    path('completed/',completed,name='completed'),
    path('profile/', profile, name='profile'),
    path('details/', details, name='details')
]
