"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf.urls import url,re_path
from django.views.generic.base import TemplateView

from django.conf import settings
from django.conf.urls.static import static



#from allauth.account.views import confirm_email as allauthemailconfirmation

#from  django.views.generic import TemplateView
from django.views.static import serve

urlpatterns = [
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    path("products/",include("products.urls")),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', views.activate_account,
        name='account_confirm_email'),
    path('rest-auth/password/reset/<uidb64>/<token>/', views.password_reset_confirm, name='password_reset_confirm'),
    path('', TemplateView.as_view(template_name='index.html')),
    path('',include("shopcart.urls")),
    path("contact-us/", include("contact_us.urls")),
    path('orders/', include("orders.urls")),
    path('subscribe/',include('subscribe.urls')),
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
    path('jet/', include('jet.urls', 'jet')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
