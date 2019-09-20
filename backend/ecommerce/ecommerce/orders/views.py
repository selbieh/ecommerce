from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet
from .models import order
from .serializer import oderSerializer
from rest_framework.response import Response
from shopcart.models import shopCart
from products.serializer import productSerializer
class ordersView(ModelViewSet):
    queryset = order.objects.all()
    serializer_class = oderSerializer

    def list(self, request, *args, **kwargs):
        serializer=oderSerializer(order.objects.filter(user=request.user.id), many=True, context={"request": request})
        return Response({
            'resulte':serializer.data
        })
    def create(self, request, *args, **kwargs):
        data=request.data
        data['user']=request.user.id
        serializer=oderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            the_cart=shopCart.objects.get(user=request.user)
            the_cart.shopCartProduct.set([])

            return Response({'message':"created"})
        else:
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    def retrieve(self, request, pk=None):
        the_order=order.objects.get(pk=pk)
        productsList=the_order.orderProduct.all()
        SerializedProductsList=productSerializer(productsList,many=True, context={"request": request})
        dicty={
            'orderProduct':SerializedProductsList.data,
            'fullAdresse':the_order.fullAdresse,
            'mobiel':the_order.mobiel,
            'orderDate':the_order.orderDate,
            'user':the_order.user.id,
            'id':the_order.id
        }
        return Response(dicty)







