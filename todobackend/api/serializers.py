from rest_framework import serializers
from api.models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    """
    Serializer for the Todo model.
    """
    # We make the user field read-only. The user will be set automatically
    # in the view based on the logged-in user, not from API input.
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Todo
        fields = ['srno', 'title', 'date', 'user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        # This ensures the password is not sent back in the API response
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """
        Create and return a new user with a hashed password.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user   