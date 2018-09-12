from django.contrib import admin
from .models import FlightsInfo, AircraftInfo

admin.site.register(FlightsInfo)
# Register your models here.
admin.site.register(AircraftInfo)