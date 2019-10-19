from django.urls import path, include
from . import views
urlpatterns=[
    path('',views.subscribe.as_view(),name='test')
]