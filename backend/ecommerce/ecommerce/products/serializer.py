from .models import product
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

class productSerializer (ModelSerializer):

    class Meta:
        fields='__all__'
        model=product
        read_only_fields =('id',)
        #depth = 2


