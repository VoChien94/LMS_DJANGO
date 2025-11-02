from django.shortcuts import render
from rest_framework import generics, permissions
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .import models
from .models import Teacher
from .serializers import TeacherSerializer


class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.AllowAny]
   # permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
   # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
@csrf_exempt
def teacher_login(request):
    email=request.POST['email']
    password=request.POST['password']
    teacherData=models.Teacher.object.get(email=email,password=password)
    if teacherData:
       return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
