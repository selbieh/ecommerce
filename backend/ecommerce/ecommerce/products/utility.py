import shutil
from django.conf import settings
'''

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
'''
# upload to path functions
def user_directory_path_1(instance, filename):
    try:
        shutil.rmtree(settings.LOCAL_STATIC_CDN_PATH + '/media/offices/office_{0}/1/'.format(instance.name,filename.replace(" ", "")))
    except:
        pass
    return 'offices/office_{0}/1/{1}/'.format(instance.name,filename.replace(" ", ""))

def user_directory_path_2(instance, filename):
    try:
        shutil.rmtree(settings.LOCAL_STATIC_CDN_PATH + '/media/offices/office_{0}/2/'.format(instance.name,filename.replace(" ", "")))
    except:
        pass
    return 'offices/office_{0}/2/{1}/'.format(instance.name,filename.replace(" ", ""))
def user_directory_path_3(instance, filename):
    try:
        shutil.rmtree(settings.LOCAL_STATIC_CDN_PATH + '/media/offices/office_{0}/3/'.format(instance.name,filename.replace(" ", "")))
    except:
        pass
    return 'offices/office_{0}/3/{1}/'.format(instance.name,filename.replace(" ", ""))
def user_directory_path_4(instance, filename):
    try:
        shutil.rmtree(settings.LOCAL_STATIC_CDN_PATH + '/media/offices/office_{0}/4/'.format(instance.name,filename.replace(" ", "")))
    except:
        pass
    return 'offices/office_{0}/4/{1}/'.format(instance.name,filename.replace(" ", ""))

#editing image
'''
def image_edit(image):


    im = Image.open(image)
    if im.mode in ('RGBA', "LA"):
        fill_color = 'RED'
        background = Image.new(im.mode[:-1], im.size, fill_color)
        background.paste(im, im.split()[-1])
        im = background
        output = BytesIO()
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
    return InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % image.name.split('.')[0], 'image/jpeg',
                                        sys.getsizeof(output), None)
'''