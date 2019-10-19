from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import product
from django.db import models

class productAdmin(ModelAdmin):
    list_display = ('pk','name','note')
    list_filter=('name','note')
admin.site.register(product,productAdmin)
# Register your models here.
