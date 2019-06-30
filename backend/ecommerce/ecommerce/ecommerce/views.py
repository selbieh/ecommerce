from django.shortcuts import HttpResponse,redirect
def activate_account(request,key):
    return redirect ('http://localhost:3000/acount-activated')
def password_reset_confirm(request,uid,token):
    return redirect ('http://localhost:3000/input-newpassword/{0}/{1}'.format(uid,token))

