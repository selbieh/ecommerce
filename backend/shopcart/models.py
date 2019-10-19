from django.db import models
from django.contrib.auth.models import User
from products.models import product
from django.db.models.signals import post_save


class productobject(models.Model):
    quantity=models.PositiveSmallIntegerField(default=1)
    product=models.ForeignKey(product,on_delete=models.CASCADE)
    def __str__(self):
        return self.product + ' ' + str(self.quantity)




class shopCart(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    shopCartProduct=models.ManyToManyField(productobject,blank=True)
    def __str__(self):
        return self.user.username

def create_shopCart(sender,**kwargs):
    if kwargs["created"]:
        shopCart.objects.create(user=kwargs["instance"])
post_save.connect(create_shopCart,sender=User)

# Create your models here.
