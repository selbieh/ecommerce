from rest_framework import permissions
from shopcart.models import shopCart
class isOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.id==obj.user.id

class isShopCartOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        userShopCart=shopCart.objects.get(user=request.user.id)
        shop_cart_items=[item.id for item in  userShopCart.shopCartProduct.all()]
        return obj.id  in shop_cart_items