from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializer import productSerializer
from .models import product



class productsViews(ReadOnlyModelViewSet):
    serializer_class = productSerializer
    queryset = product.objects.all()


# Create your views here.
