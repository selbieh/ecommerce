"""
Django settings for ecommerce project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import django_heroku

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'n7kws6^_u1k*0@m56kuqu6#$y*aedeq(thtxteolr19tfz!&pb'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS=['http://glass-office.herokuapp.com']

CORS_ORIGIN_WHITELIST =['http://glass-office.herokuapp.com']
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True





# Application definition

INSTALLED_APPS = [
    'jet',

    #'ecommerce.apps.SuitConfig',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'subscribe',
    'products',
    'shopcart',
    'orders',
    'sorl.thumbnail',
    #DJANGO DRF
    'rest_framework',
    #DJANGO REST-AUTH
    'rest_framework.authtoken',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth',
    'rest_auth.registration',
    #will not used but for make framework works without bugs
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.twitter',
    #django header Cores
    'corsheaders',
    #imagekit
    'imagekit',
    'contact_us',
    #'drf-rw-serializers'


]

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',

    # django cors header
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    #'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ecommerce.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ecommerce.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators
#make password brity easy
AUTH_PASSWORD_VALIDATORS = [
    #{
       # 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    #},
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
'OPTIONS': {
            'min_length': 5,
        }
    },
   # {
        #'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    #},
   # {
       # 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    #},
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 6,
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
        #'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        #'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',

    ),
'DEFAULT_PARSER_CLASSES': (
    'rest_framework.parsers.JSONParser',
    'rest_framework.parsers.FormParser',
    'rest_framework.parsers.MultiPartParser',
),
}
# Django Suit configuration example


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

#make settig as it is ..create staticfiles inside app foler
#create static_cdn_test beside the app folder
STATIC_URL = '/static/'
#LOCAL_STATIC_CDN_PATH = os.path.join(os.path.dirname(BASE_DIR), 'static_cdn_test')# must be created outside project folder beside mai app folder
#STATIC_ROOT = os.path.join(LOCAL_STATIC_CDN_PATH, 'static') # live cdn AWS S3   / will create static folder inside static_cdn_test wich is outside the project folder
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'staticproject') #in project folder create staticfiles folder and add all static on it
]
#MEDIA_ROOT = os.path.join(LOCAL_STATIC_CDN_PATH, 'media') #will auto created inside static_cdn_test wich is outside the project folder
MEDIA_URL = '/media/' # django-storages
MEDIA_ROOT = os.path.join(STATIC_ROOT, 'media')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
django_heroku.settings(locals())


#Rest-auth Site_ID
SITE_ID = 1
# REST AUTH MAIL CONFIG
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'email'
EMAIL_HOST_PASSWORD = 'password'
EMAIL_PORT = 587
#rest auth setting
OLD_PASSWORD_FIELD_ENABLED = True

#ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
#ACCOUNT_EMAIL_REQUIRED = True