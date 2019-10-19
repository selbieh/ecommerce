from django.db import models
from django.contrib.auth.models import User
from shopcart.models import productobject
from django.db.models.signals import post_save

# Create your models here.
class order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    orderProduct=models.ManyToManyField(productobject)
    fullAdresse=models.CharField(max_length=255,blank=False)
    mobiel=models.CharField(max_length=11,blank=True)
    orderDate=models.DateField(auto_now=True)
    seen=models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

