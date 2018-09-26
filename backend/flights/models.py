#!/usr/bin/env python
from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from datetime import date


class Aircraft(models.Model):
    SEL = 'Airplane SEL'
    SES = 'Airplane SES'
    MEL = 'Airplane MEL'
    MES = 'Airplane MES'
    license_choices = (
    (SEL, 'SEL'),
    (SES, 'SES'),
    (MEL, 'MEL'),
    (MES, 'MES'),
    )

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    man_type = models.CharField(max_length=200)
    tail_number = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    license_type = models.CharField(max_length=40, choices=license_choices, default="Airplane SEL")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ImageField(default="/plane.jpg", upload_to="aircrafts/%Y/%m/%D/", blank=True)
    class Meta:
        verbose_name_plural = "Aircraft"

    def __str__(self):
        return f'<{self.__class__.__name__}: {self.man_type} {self.license_type}>'

# Aircraft SEL
    # Single-engine land
    # Single-engine sea
    # Multi-engine land
    # Multi-engine sea
class Flights(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=200)
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    no_instument_app = models.FloatField(default=0.0, blank=True, null=True)
    no_ldg = models.FloatField(default=0.0, blank=True, null=True)
    cross_country = models.FloatField(default=0.0, blank=True, null=True)
    pic = models.FloatField(default=0.0, blank=True, null=True)
    dual_rec = models.FloatField(default=0.0, blank=True, null=True)
    actual_instr = models.FloatField(default=0.0, blank=True, null=True)
    sim_instr = models.FloatField(default=0.0, blank=True, null=True)
    day = models.FloatField(default=0.0, blank=True, null=True)
    night = models.FloatField(default=0.0, blank=True, null=True)
    airports_visited = models.CharField(max_length=100, default="Airports", blank=True)
    fly_date = models.DateField(default=date.today, blank=True, null=True)
    snippet = models.TextField(blank=True, default="snippet", null=True)
    # license_ty = models.ForeignKey(Aircraft, to_field="license_type", on_delete=models.CASCADE)
    license_type = models.CharField(max_length=40, default="Airplane SEL", null=False)
    # man_type = models.CharField(max_length=200, default="Manufacturer")
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, default=uuid4, null=True )
    total_hours = models.FloatField(default=0.0, blank=False)
    sv_html = models.CharField(max_length=300, blank=True)
    sv_script = models.CharField(max_length=300, blank=True)
    # pic_count = models.FloatField(default=0.0)
    # uncomment if instructor fields end up being needed
    # intsr_name = models.CharField(max_length=50)
    # intsr_num = models.PositiveSmallIntegerField()

    class Meta:
        verbose_name_plural = "flights"

    def __str__(self):
        return self.name


class Billing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stripe_payment_token = models.CharField(max_length=200)
    payment_date = models.DateTimeField(auto_now_add=True)