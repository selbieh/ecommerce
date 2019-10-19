from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet
from .serializer import productSerializer
from .models import product




class productsViews(ReadOnlyModelViewSet):
    serializer_class = productSerializer
    queryset = product.objects.all()











