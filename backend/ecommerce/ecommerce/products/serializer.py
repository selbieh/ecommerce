from .models import product
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

class productSerializer (ModelSerializer):
    #image_1=serializers.ImageField(use_url=True,allow_empty_file=True)
    #image_2=serializers.ImageField(use_url=True,allow_empty_file=True)
    #image_3=serializers.ImageField(use_url=True,allow_empty_file=True)
    #image_4=serializers.ImageField(use_url=True,allow_empty_file=True)

    class Meta:
        fields='__all__'
        model=product
        #fields=('name','note','detail','price','image_1','image_2','image_3','image_4')
        read_only_fields =('id',)

