from django.db import models
from .utility import *
from imagekit.processors import Resize
from imagekit.models import ProcessedImageField



class product (models.Model):
    name=models.CharField(max_length=15,blank=False)
    note=models.CharField(max_length=130,blank=True)
    detail=models.TextField(max_length=300,blank=True)
    price=models.IntegerField()
    image_1=ProcessedImageField(upload_to=user_directory_path_1,blank=True,
                                           processors=[Resize(350, 250)],
                                           format='JPEG',
                                           options={'quality': 100})
    image_2=ProcessedImageField(upload_to=user_directory_path_2,blank=True,
                                           processors=[Resize(350, 250)],
                                           format='JPEG',
                                           options={'quality': 100})
    image_3=ProcessedImageField(upload_to=user_directory_path_3,blank=True,
                                           processors=[Resize(350, 250)],
                                           format='JPEG',
                                           options={'quality': 100})
    image_4= ProcessedImageField(upload_to=user_directory_path_4,blank=True,
                                           processors=[Resize(350, 250)],
                                           format='JPEG',
                                           options={'quality': 100})

    def __str__(self):
        return self.name
#now djago will auto delet the old image in case of edit & auto edit ay uploaded image to 250X350 size
#if you have no image form will bbe accepted+
    '''
    def save(self,*args,**kwargs):
        try:
            old_oject = product.objects.get(id=self.id)
            if self.image_1:
                if self.image_1!=old_oject.image_1:
                    self.image_1=image_edit(self.image_1)
            if self.image_2:
                if self.image_2!=old_oject.image_2:
                    self.image_2=image_edit(self.image_2)
            if self.image_3:
                if self.image_3!=old_oject.image_3:
                    self.image_3=image_edit(self.image_3)
            if self.image_4:
                if self.image_4!=old_oject.image_4:
                    self.image_4=image_edit(self.image_4)
        except:
            if self.image_1:
                self.image_1 = image_edit(self.image_1)
            if self.image_2:
                self.image_2 = image_edit(self.image_2)
            if self.image_3:
                self.image_3 = image_edit(self.image_3)
            if self.image_4:
                self.image_4 = image_edit(self.image_4)

        super(product, self).save()

  
    '''