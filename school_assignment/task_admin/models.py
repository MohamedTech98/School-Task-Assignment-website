from django.conf import settings
from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=60)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_tasks', null=True, blank=True)
    priority_level = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    priority = models.CharField(max_length=10, choices=priority_level)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)


