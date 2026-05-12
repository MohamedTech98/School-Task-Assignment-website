from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=60)
    # here foreign key from Teacher 
    # here foreign key from Admin
    priority_level = [
        ('high','High'),
        ('medium','Medium'),
        ('low','Low'),
    ]
    priority = models.CharField(choices=priority_level)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=200)


