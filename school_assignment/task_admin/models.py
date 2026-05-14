from django.db import models
from authentication.models import User
from django.utils import timezone


class Task(models.Model):
    id = models.BigAutoField(primary_key=True)
    task_code = models.CharField(max_length=64, unique=True, null=False, blank=False)
    title = models.CharField(max_length=100)
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_task',
        limit_choices_to={'role': 'teacher'}
    )
    admin = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='admin_task'
    )
    priority = models.CharField(max_length=100)
    deadline = models.DateField(default=timezone.now)
    description = models.TextField()

    def __str__(self):
        return f"id: {self.id} | title: {self.title}"