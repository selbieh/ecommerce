from .models import product
from rest_framework.serializers import ModelSerializer

class productSerializer (ModelSerializer):
    class Meta:
        model=product
        fields='__all__'
        read_only_fields =('id',)

