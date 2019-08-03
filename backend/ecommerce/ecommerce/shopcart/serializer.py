from rest_framework.serializers import ModelSerializer
from .models import shopCart
class shopCartSerializer(ModelSerializer):
    class Meta:
        model=shopCart
        fields='__all__'














        #notes
        # product_Name=serializers.PrimaryKeyRelatedField(queryset=product.objects.all(),source='shopCartProduct',many=True)
        # product_ID=serializers.ManyRelatedField(queryset=product.objects.all(),source='shopCartProduct',many=True,read_only=True)
        # shopCartProduct = serializers.ManyRelatedField(many=True)
        # shopCartProduct=productSerializer(many=True)
        # product_ID=serializers.ManyRelatedField(source='shopCartProduct',child_relation=product.id)
        # product_ID=serializers.HyperlinkedIdentityField(view_name='track-list')
        # product_ID = serializers.SlugRelatedField(many=True,slug_field='__all__',queryset=product.objects.all(),source='shopCartProduct')

        #fields=('product_Name','shopCartProduct',)
        #extra_arg= {'shopCartProduct': {'allow_empty': True}}


