from rest_framework import serializers
from TodoProject.models import Todo

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