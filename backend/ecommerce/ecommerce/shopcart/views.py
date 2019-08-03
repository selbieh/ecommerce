from rest_framework.viewsets import ModelViewSet
from rest_framework.views import Response
from .models import shopCart
from .premissions import isOwner
from rest_framework import status
from .serializer import shopCartSerializer
from products.serializer import productSerializer
class shopCartModelView(ModelViewSet):
    serializer_class = shopCartSerializer
    permission_classes = (isOwner,)
    def get_queryset(self):
        return shopCart.objects.all()
    def list(self, request, *args, **kwargs):
        user_shop_cart = shopCart.objects.get(user=request.user.id)
        shop_cart_products = user_shop_cart.shopCartProduct.all()
        serializer = productSerializer(shop_cart_products, many=True, context={"request": request})
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














#notes
        #return Response({'message':'this method is allawed only with admin'},status=status.HTTP_403_FORBIDDEN)


    #def retrieve(self, request, pk=None):
    #    user_shop_cart=shopCart.objects.get(user=request.user.id)
    #    xx=user_shop_cart.shopCartProduct.all()
    #    serializer=productSerializer(xx,many=True,context={"request":request})
    #    return Response(serializer.data)
    #    return Response({'message': 'this method is allawed only with admin'}, status=status.HTTP_403_FORBIDDEN)