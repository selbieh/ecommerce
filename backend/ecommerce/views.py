from django.shortcuts import redirect
from django.shortcuts import render

from django.views.decorators.csrf import ensure_csrf_cookie

def activate_account(request,key):
    return redirect ('https://glass-office.herokuapp.com/registration-confirm-mail/{0}'.format(key))

def password_reset_confirm(request,uidb64,token):
    return redirect ('https://glass-office.herokuapp.com/input-newpassword/{0}/{1}'.format(uidb64,token))
@ensure_csrf_cookie
def landingPage(request):
    return render(request,'index.html')


