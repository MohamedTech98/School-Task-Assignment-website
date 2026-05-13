from rest_framework import serializers
from .models import Task
from authentication.models import User

class TaskSerializers(serializers.ModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.filter(role = 'teacher')
    )
    admin = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.filter(role = 'admin')
    )
    class Meta:
        model = Task
        fields = [
            'task_code','title','teacher','admin','deadline','description'
        ]
        read_only_fields = ['id']
