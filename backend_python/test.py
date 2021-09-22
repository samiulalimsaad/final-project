import validators

a = ''
b= "http://google.com"

if validators.url(a):
    print("Valid")
else:
    print("Not valid")