from rest_framework import serializers
from .models import order
from products.models import product
from products.serializer import productSerializer

class oderSerializer(serializers.ModelSerializer):
    #orderProduct=productSerializer(many=True)
    class Meta:
        fields='__all__'
        model=order
