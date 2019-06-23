from django.db import models
from django.contrib.auth.models import User
from products.models import product
from django.db.models.signals import post_save

# Create your models here.
class order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    orderProduct=models.ManyToManyField(product,blank=True)
    name=models.CharField(max_length=23,blank=True)
    mobiel=models.CharField(max_length=11,blank=True)
    city=models.CharField(max_length=10,blank=True)
    area=models.CharField(max_length=10,blank=True)
    streetName=models.CharField(max_length=10,blank=True)
    nubmerOfBuliding=models.CharField(max_length=5,blank=True)
    adressSing=models.CharField(max_length=25,blank=True)
    def __str__(self):
        return self.user.username

def create_shopCart(sender,**kwargs):
    if kwargs["created"]:
        order.objects.create(user=kwargs["instance"])
post_save.connect(create_shopCart,sender=User)