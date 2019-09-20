from django.db import models
from django.contrib.auth.models import User
from products.models import product
from django.db.models.signals import post_save

# Create your models here.
class order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    orderProduct=models.ManyToManyField(product)
    fullAdresse=models.CharField(max_length=255,blank=False)
    mobiel=models.CharField(max_length=11,blank=True)
    orderDate=models.DateField(auto_now=True)

    def __str__(self):
        return self.user.username

