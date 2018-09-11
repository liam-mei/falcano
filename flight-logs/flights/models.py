from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User

class FlightsInfo(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  name = models.CharField(max_length=200)
  content = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)


  def __str__(self):
        return self.name
# Create your models here.
