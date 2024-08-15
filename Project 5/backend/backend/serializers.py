from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Idea, Comment
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        return user


class IdeaSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = Idea
        fields = '__all__'

    # def create(self, validated_data):
    #     print(validated_data)
    #     user_id = validated_data.pop("created_by")
    #     user = User.objects.get(pk=user_id)
    #     validated_data["created_by"] = user
    #     return Idea.objects.create(**validated_data)

    def get_created_by(self, obj):
        user = obj.created_by
        print(user)
        return {
            'id': user.id,
            'username': user.username
        }


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Include additional claims in the access token payload if needed
        token['user_id'] = user.id

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Include the user ID in the response data
        data['id'] = self.user.id

        return data

