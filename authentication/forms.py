from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.exceptions import ValidationError

from .models import User


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={
        'placeholder': 'Enter your email address',
    }))
    first_name = forms.CharField(max_length=30, widget=forms.TextInput(attrs={
        'placeholder': 'First name',
    }))
    last_name = forms.CharField(max_length=30, widget=forms.TextInput(attrs={
        'placeholder': 'Last name',
    }))
    role = forms.ChoiceField(choices=User.Role.choices, widget=forms.Select(attrs={
        'class': 'role-select',
    }))

    class Meta:
        model = User
        fields = ['role', 'first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in ('username', 'password1', 'password2'):
            self.fields[field_name].widget.attrs.update({
                'placeholder': self.fields[field_name].label or field_name,
            })

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('A user with this email already exists.')
        return email


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Enter your username',
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter your password',
    }))
