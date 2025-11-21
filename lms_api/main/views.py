from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.db.models import Avg, Value,FloatField
from django.db.models.functions import Coalesce
from rest_framework.pagination import PageNumberPagination

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from . import models
from .models import Teacher, CourseCategory, Course,Chapter
from .serializers import FaqSerializer,StudyMaterialSerializer,AttemptQuizSerializer, CourseQuizSerializer,QuestionSerializer,QuizSerializer,StudentCourseEnrollSerializer ,TeacherSerializer, CategorySerializer, CourseSerializer,ChapterSerializer,StudentSerializer,CourseRatingSerializer,TeacherDashboardSerializer,StudentFavoriteCourseSerializer, StudentAssignmentSerializer,StudentDashboardSerializer,NotificationSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 8


class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        
        if 'popular' in self.request.GET:
            sql = """
                SELECT 
                    t.id,
                    t.full_name,
                    t.email,
                    t.password,
                    t.qualification,
                    t.mobile_no,
                    t.profile_img,
                    t.skills,
                    COUNT(c.id) AS total_course
                FROM main_teacher AS t
                LEFT JOIN main_course AS c
                    ON c.teacher_id = t.id
                GROUP BY 
                    t.id,
                    t.full_name,
                    t.email,
                    t.password,
                    t.qualification,
                    t.mobile_no,
                    t.profile_img,
                    t.skills
                ORDER BY total_course DESC
            """
            return Teacher.objects.raw(sql)

        return Teacher.objects.all()





class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        teacherData = models.Teacher.objects.get(email=email, password=password)
    except models.Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        return JsonResponse({'bool': True, 'teacherId': teacherData.id})
    else:
        return JsonResponse({'bool': False})




@method_decorator(csrf_exempt, name='dispatch')
class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]



@method_decorator(csrf_exempt, name='dispatch')
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class=StandardResultsSetPagination
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()

        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            category =models.CourseCategory.objects.filter(id=category).first()
            qs = models.Course.objects.filter(category=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = models.Course.objects.filter(techs__icontains=skill_name, teacher=teacher)
        
        if 'searchstring' in self.kwargs :
            search = self.kwargs['searchstring']
            if search :
                qs = models.Course.objects.filter(Q(title__icontains=search)|Q(techs__icontains=search))
          
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Student.objects.get(pk=student_id)
            print(student.interested_categories)
            queries = [Q(techs__iendswith=value) for value in student.interested_categories]
            query = queries.pop()
            for item in queries:
                query |= item
            self.serializer_class = CourseSerializer 
            return qs
        return qs




@method_decorator(csrf_exempt, name='dispatch')
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]


#Specific Teacher Course
@method_decorator(csrf_exempt, name='dispatch')
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher_id=teacher_id)

@method_decorator(csrf_exempt, name='dispatch')
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

#Chapter
@method_decorator(csrf_exempt, name='dispatch')
class ChapterList(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

@method_decorator(csrf_exempt, name='dispatch')
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['chapter_duration'] = self.chapter_duration
        print('---------- context ----------')
        print(context)
        return context


# Student Data
@method_decorator(csrf_exempt, name='dispatch')
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]

class StudentDashboard(generics.RetrieveAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentDashboardSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication, TokenAuthentication]


@csrf_exempt
def student_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        studentData = models.Student.objects.get(email=email, password=password)
    except models.Student.DoesNotExist:
        studentData=None
    if studentData:
        return JsonResponse({'bool': True, 'studentId': studentData.id})
    else:
        return JsonResponse({'bool': False})

@method_decorator(csrf_exempt, name='dispatch')
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_create(self, serializer):
        course_id = self.request.data.get('course')
        student_id = self.request.data.get('student')
        course = models.Course.objects.get(id=course_id)
        student = models.Student.objects.get(id=student_id)
        serializer.save(course=course, student=student)



def fetch_enroll_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset = models.StudentFavoriteCourse.objects.all()
    serializer_class = StudentFavoriteCourseSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()


def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(course=course, student=student).count()
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


def fetch_favorite_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favoriteStatus = models.StudentFavoriteCourse.objects.filter(course=course, student=student).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


def remove_favorite_course(request, course_id, student_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favoriteStatus = models.StudentFavoriteCourse.objects.filter(course=course, student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})




class EnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Student.objects.get(pk=student_id)
            qs=models.Course.objects.filter(techs__in=student.interested_categories)
            self.serializer_class = CourseSerializer
            print(qs.query)
            return qs

class PopularCoursesList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return models.Course.objects.annotate(
            avg_rating=Coalesce(
                Avg("courserating__rating"),
                Value(0.0),
                output_field=FloatField()
            )
        ).order_by('-avg_rating')[:4]



class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql = """
            SELECT 
                c.id,
                c.title,
                c.featured_img,
                AVG(cr.rating) as avg_rating
            FROM main_courserating AS cr
            INNER JOIN main_course AS c ON cr.course_id = c.id
            GROUP BY c.id, c.title, c.featured_img
            ORDER BY avg_rating DESC
            LIMIT 4
            """
            return models.CourseRating.objects.raw(sql)

        if 'all' in self.request.GET:
            sql = """
            SELECT 
                c.id,
                c.title,
                c.featured_img,
                AVG(cr.rating) as avg_rating
            FROM main_courserating AS cr
            INNER JOIN main_course AS c ON cr.course_id = c.id
            GROUP BY c.id, c.title, c.featured_img
            ORDER BY avg_rating DESC
            """
            return models.CourseRating.objects.raw(sql)




    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        serializer.save(course=course)

def fetch_rating_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
@csrf_exempt
def teacher_change_password(request,teacher_id):
    password = request.POST.get('password')
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
@method_decorator(csrf_exempt, name='dispatch')
class AssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student = models.Student.objects.get(pk=student_id)
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignment.objects.filter(student=student,teacher=teacher)
    
@method_decorator(csrf_exempt, name='dispatch')
class MyAssignmentList(generics.ListCreateAPIView):
    serializer_class = StudentAssignmentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = models.Student.objects.get(pk=student_id)

     
        models.Notification.objects.filter(
            student=student,
            notif_for='student',
            notif_subject='assignment'
        ).update(notifiread_status=True)

        return models.StudentAssignment.objects.filter(student=student)

    def get_serializer_context(self):
       
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context

@method_decorator(csrf_exempt, name='dispatch')
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    permission_classes = [permissions.AllowAny]

@csrf_exempt
def student_change_password(request,student_id):
    password = request.POST.get('password')
    try:
        studentData = models.Student.objects.get(id=student_id)
    except models.Teacher.DoesNotExist:
        studentData=None
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
class NotificationList(generics.ListCreateAPIView):
    queryset = models.Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        student_id = self.kwargs.get('student_id')
        if student_id:
            student = models.Student.objects.get(pk=student_id)

            return models.Notification.objects.filter(
                student=student,
                notifiread_status=False
            )
        return models.Notification.objects.none()

    def perform_create(self, serializer):
        serializer.save()


@method_decorator(csrf_exempt, name='dispatch')
class QuizList(generics.ListCreateAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Quiz.objects.filter(teacher_id=teacher_id)

@method_decorator(csrf_exempt, name='dispatch')
class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]
    def create(self, request, *args, **kwargs):
        quiz_id = self.kwargs.get('quiz_id')
        quiz = models.Quiz.objects.get(pk=quiz_id)

        data = request.data.copy()
        data['quiz'] = quiz.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=201)
    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        quiz = models.Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return models.QuizQuestions.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question= self.kwargs['question_id']
            return models.QuizQuestions.objects.filter(quiz=quiz,id__gt=current_question).order_by('id')[:1]
        else:
            return models.QuizQuestions.objects.filter(quiz=quiz)
    
@method_decorator(csrf_exempt, name='dispatch')
class CourseQuizList(generics.ListCreateAPIView):
    queryset = models.CourseQuiz.objects.all()
    serializer_class = CourseQuizSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)


def fetch_quiz_assign_status(request, quiz_id, course_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    assignStatus = models.CourseQuiz.objects.filter(course=course, quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


    
@method_decorator(csrf_exempt, name='dispatch')
class AttemptQuizList(generics.ListCreateAPIView):
    serializer_class = AttemptQuizSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id = self.kwargs['quiz_id']

            query = f"""
                SELECT 
                    MIN(id) AS id,
                    student_id,
                    quiz_id,
                    MAX(question_id) AS question_id,
                    MAX(right_ans) AS right_ans,
                    MAX(add_time) AS add_time
                FROM main_attempquiz
                WHERE quiz_id = {quiz_id}
                GROUP BY student_id;
            """

            return models.AttempQuiz.objects.raw(query)

        return super().get_queryset()



@method_decorator(csrf_exempt, name='dispatch')
class QuizResultView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, quiz_id, student_id, *args, **kwargs):
        try:
            quiz = models.Quiz.objects.get(pk=quiz_id)
            student = models.Student.objects.get(pk=student_id)
        except (models.Quiz.DoesNotExist, models.Student.DoesNotExist):
            return Response(
                {"detail": "Quiz or student not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Đếm tổng số câu hỏi
        total_questions = models.QuizQuestions.objects.filter(quiz=quiz).count()

        # Đếm tổng số câu đã làm
        total_attempted_questions = models.AttempQuiz.objects.filter(
            quiz=quiz,
            student=student
        ).count()

        # Lấy danh sách câu attempt
        attempted_questions = models.AttempQuiz.objects.filter(
            quiz=quiz,
            student=student
        )

        # Đếm số câu đúng
        total_correct_questions = 0
        for attempt in attempted_questions:
            if attempt.right_ans == attempt.question.right_ans:
                total_correct_questions += 1

        return Response({
            "total_questions": total_questions,
            "total_attempted_questions": total_attempted_questions,
            "total_correct_questions": total_correct_questions
        })


def fetch_quiz_attempt_status(request, quiz_id, student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()
    attemptStatus = models.AttempQuiz.objects.filter(student=student, question__quiz=quiz).count()
    if attemptStatus > 0 :
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
def fetch_quiz_result(request, quiz_id, student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()
    total_questions = models.QuizQuestions.objects.filter(quiz=quiz).count()
    total_attempted_questions = models.AttempQuiz.objects.filter(quiz=quiz, student=student).values('student').count()
    attempted_questions = models.AttempQuiz.objects.filter(quiz=quiz, student=student)

    total_correct_questions = 0
    for attempt in attempted_questions:
        if attempt.right_ans == attempt.question.right_ans:
            total_correct_questions += 1
    return JsonResponse({'total_questions':total_questions,'total_attempted_questions':total_attempted_questions,'total_correct_questions':total_correct_questions})

@method_decorator(csrf_exempt, name='dispatch')
class StudyMaterialList(generics.ListCreateAPIView):
    serializer_class = StudyMaterialSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.StudyMaterial.objects.filter(course=course)
    
@method_decorator(csrf_exempt, name='dispatch')
class StudyMaterialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer
    permission_classes = [permissions.AllowAny]

def update_view(request, course_id):
    queryset = models.Course.objects.filter(pk=course_id).first()
    queryset.course_views += 1
    queryset.save()
    return JsonResponse({'views': queryset.course_views})

class StudentTestimonialList(generics.ListAPIView):
    queryset = models.CourseRating.objects.filter(
        reviews__isnull=False
    ).exclude(reviews="").order_by('-id')
    serializer_class = CourseRatingSerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(csrf_exempt, name='dispatch')
class FaqList(generics.ListAPIView):
    queryset = models.FAQ.objects.all()
    serializer_class = FaqSerializer
    permission_classes = [permissions.AllowAny]