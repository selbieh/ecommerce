from django.contrib import admin
from .models import order
class odrderAdmin(admin.ModelAdmin):
    list_display = ('pk','user','seen',)
admin.site.register(order,odrderAdmin)
# Register your models here.
