from django.contrib import admin
from .models import Flights, Aircraft

admin.site.register(Flights)
# Register your models here.
admin.site.register(Aircraft)
