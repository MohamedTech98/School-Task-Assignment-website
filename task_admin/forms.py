from django import forms
from .models import Task
from authentication.models import User


class TaskForm(forms.ModelForm):
    teacher = forms.ModelChoiceField(
        queryset=User.objects.filter(role='teacher'),
        empty_label='-- Select Teacher --',
        widget=forms.Select()
    )

    class Meta:
        model = Task
        fields = [
            'task_code', 'title', 'teacher', 'priority', 'deadline', 'description'
        ]
