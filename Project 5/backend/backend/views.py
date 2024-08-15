from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from .models import Idea, Comment
from .serializers import IdeaSerializer, CommentSerializer, UserSerializer, RegisterSerializer, \
    CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class IdeaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)


class IdeaDetailAPIView(generics.RetrieveAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer

    def post(self, request, *args, **kwargs):
        idea = self.get_object()
        print(request.data)
        if 'upvote' in request.data:
            idea.upvotes += 1
        elif 'downvote' in request.data:
            idea.downvotes += 1
        idea.save()
        return Response(self.get_serializer(idea).data)


class CommentCreateAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentsAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        idea_id = self.kwargs['idea_id']
        return Comment.objects.filter(idea_id=idea_id)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProfileIdeasAPIView(generics.ListAPIView):
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve ideas associated with the current user
        user = self.request.user
        return Idea.objects.filter(created_by=user)


class IdeaDeleteAPIView(generics.DestroyAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        idea = self.get_object()
        if idea.created_by != request.user:
            raise PermissionDenied("You do not have permission to delete this idea.")
        return self.destroy(request, *args, **kwargs)


class IdeaDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        idea = super().get_object()
        if idea.created_by != self.request.user:
            raise PermissionDenied("You do not have permission to edit this idea.")
        return idea