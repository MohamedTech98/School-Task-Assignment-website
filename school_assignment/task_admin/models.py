# import uuid
from django.db import models
from authentication.models import User
from django.utils import timezone 
# Create your models here.

class Task(models.Model):
    id = models.BigAutoField(primary_key=True)
    task_code = models.CharField(max_length=64,unique=True,null=False,blank=True)   
    title = models.CharField(max_length=100)
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_task'
        )
    admin = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='admin_task'
        )
    deadline = models.DateField(default= timezone.now)
    description = models.TextField()
    def __str__(self):
        return f"id: {self.id}\ntile_code: {self.title}"


