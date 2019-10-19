from rest_framework import serializers
from .models import subscribe

class subscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model=subscribe
        fields='__all__'
