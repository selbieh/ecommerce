from django.db import models
class subscribe(models.Model):
    email=models.EmailField(blank=False,unique=True)
    def __str__(self):
        return self.email


# Create your models here.
