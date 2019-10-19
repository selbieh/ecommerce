from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializer import subscribeSerializer
from .models import subscribe


class subscribe(CreateAPIView):
    model=subscribe
    serializer_class=subscribeSerializer




