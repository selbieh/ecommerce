from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

# identfy the imgae full_path
def user_directory_path(instance, filename):
    return 'offices/office_{0}/{1}/{1}/'.format(instance.name, filename)

class product (models.Model):
    name=models.CharField(max_length=15,blank=False)
    note=models.CharField(max_length=130,blank=True)
    detail=models.TextField(max_length=300,blank=True)
    image_1=models.ImageField(upload_to=user_directory_path,blank=True)
    #img2=models.ImageField(upload_to=user_directory_path,blank=True)
    #img3=models.ImageField(upload_to=user_directory_path,blank=True)
    #img4=models.ImageField(upload_to=user_directory_path,blank=True)

    def save(self,*args,**kwargs):
        # Opening the uploaded image
        if self.image_1:
            im = Image.open(self.image_1)
            if im.mode in ('RGBA',"LA"):
                output = BytesIO()
                fill_color='RED'
                background = Image.new(im.mode[:-1], im.size, fill_color)
                background.paste(im, im.split()[-1])
                im = background
                im = im.resize((350, 250))
                im.save(output, format='JPEG', quality=100)
            else:
                output = BytesIO()
                # Resize/modify the image
                im = im.resize((350, 250))
                # after modifications, save it to the output
                im.save(output, format='JPEG', quality=100)
                output.seek(0)
                # change the imagefield value to be the newley modifed image value
        self.image_1 = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.image_1.name.split('.')[0], 'image/jpeg',
                                                sys.getsizeof(output), None)

        super(product, self).save()