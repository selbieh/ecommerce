from django.shortcuts import HttpResponse,redirect
def activate_account(request,key):
    return redirect ('http://localhost:3000/registration-confirm-mail/{0}'.format(key))

def password_reset_confirm(request,uidb64,token):
    return redirect ('http://localhost:3000/input-newpassword/{0}/{1}'.format(uidb64,token))



