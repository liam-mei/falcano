from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User

class FlightsCard(model.Model):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  name = models.CharField(max_length=128)
  created_at = models.DateTimeField(auto_now_add=True)
  text = models.TextField()
  

# Create your models here.
