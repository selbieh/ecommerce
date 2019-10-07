from rest_framework.viewsets import ModelViewSet
from rest_framework.views import Response
from .models import shopCart
from .premissions import isOwner,isShopCartOwner
from rest_framework import status
from .serializer import shopCartSerializer,productObjectSerializer
from products.serializer import productSerializer
from shopcart.serializer import productObjectEdit
from shopcart.models import productobject
from products.models import product
from rest_framework.permissions import IsAuthenticated

class shopCartModelView(ModelViewSet):
    serializer_class = shopCartSerializer
    permission_classes = (isOwner,)
    queryset = shopCart.objects.all()

    def list(self, request, *args, **kwargs):
        user_shop_cart = shopCart.objects.get(user=request.user.id)
        shop_cart_products = user_shop_cart.shopCartProduct.all()
        serializer = productObjectSerializer(shop_cart_products, many=True, context={"request": request})
        result={
            "result":{
                "user":request.user.id,
                'id': user_shop_cart.id,
                'products':serializer.data
            }
        }
        return Response(result)
    def destroy(self, request, *args, **kwargs):
        return Response({"message":"method is not allowed"},status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        return Response({"message": "method is not allowed"}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        user_shop_cart = shopCart.objects.get(user=request.user.id)
        the_product=product.objects.get(pk=request.data.get('id'))
        user_shop_cart.shopCartProduct.create(product=the_product)
        return Response({"message":"done"})
    def retrieve(self, request, *args, **kwargs):
        return Response({"message": "method is not allowed"}, status=status.HTTP_403_FORBIDDEN)

class prodctObject(ModelViewSet):
    serializer_class = productObjectEdit
    queryset = productobject.objects.all()
    permission_classes = (IsAuthenticated,isShopCartOwner)
    def list(self, request, *args, **kwargs):
        user_shop_cart=shopCart.objects.get(user=request.user.id)
        user_products=user_shop_cart.shopCartProduct.all()
        serializer=productObjectSerializer(user_products,many=True,context={"request": request})
        return Response(serializer.data)

    def partial_update(self, request,pk=None):
        the_product_object=productobject.objects.get(id=pk)
        the_product_object.quantity=(int(request.data.get('quantity')))
        the_product_object.save()
        return Response({"message":'object updated'})

#notes
        #return Response({'message':'this method is allawed only with admin'},status=status.HTTP_403_FORBIDDEN)


    #def retrieve(self, request, pk=None):
    #    user_shop_cart=shopCart.objects.get(user=request.user.id)
    #    xx=user_shop_cart.shopCartProduct.all()
    #    serializer=productSerializer(xx,many=True,context={"request":request})
    #    return Response(serializer.data)
    #    return Response({'message': 'this method is allawed only with admin'}, status=status.HTTP_403_FORBIDDEN)