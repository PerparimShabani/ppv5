from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework.routers import DefaultRouter
from .views import UserList, UserDetail, RegisterView, IdeaDetailAPIView, CommentCreateAPIView, IdeaListCreateAPIView, CustomTokenObtainPairView, CommentsAPIView, ProfileIdeasAPIView, IdeaDeleteAPIView, IdeaDetailUpdateAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ideas', IdeaListCreateAPIView.as_view(), name='idea-list'),
    path('api/profile/ideas', ProfileIdeasAPIView.as_view(), name='profile-ideas'),
    path('api/ideas/<int:pk>/delete', IdeaDeleteAPIView.as_view(), name='idea-delete'),
    path('api/ideas/<int:pk>/edit', IdeaDetailUpdateAPIView.as_view(), name='idea-detail-update'),
    path('api/ideas/<int:pk>', IdeaDetailAPIView.as_view(), name='idea-detail'),
    path('api/ideas/<int:pk>/upvote', IdeaDetailAPIView.as_view(), name='idea-detail'),
    path('api/ideas/<int:pk>/downvote', IdeaDetailAPIView.as_view(), name='idea-detail'),
    path('api/ideas/<int:idea_id>/comments', CommentsAPIView.as_view(), name='comment-list'),
    path('api/ideas/<int:pk>/comments/create', CommentCreateAPIView.as_view(), name='comment-create'),
    path('api/register', RegisterView.as_view(), name='register'),
    path('api/token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('users', UserList.as_view(), name='user-list'),
    path('users/<int:pk>', UserDetail.as_view(), name='user-detail'),
]
