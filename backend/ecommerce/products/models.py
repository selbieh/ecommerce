from django.db import models


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.product.name, filename)

class product (models.Model):
    name=models.CharField(max_length=15,blank=False)
    note=models.CharField(max_length=130)
    detail=models.TextField(max_length=300)
    img1=models.ImageField(upload_to=user_directory_path)
# Create your models here.
