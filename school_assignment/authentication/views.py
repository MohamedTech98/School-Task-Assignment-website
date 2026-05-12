from django.shortcuts import render

# Create your views here.
def home_view(request):
    return render(request,'index.html')

def login_view(request):
    return render(request,'Login_Sign/Login.html')