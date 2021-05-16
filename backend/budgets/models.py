from django.db import models
from django.contrib.auth.models import User


class Budget(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User)


class Income(models.Model):
    budget = models.ForeignKey(Budget)


class Expense(models.Model):
    budget = models.ForeignKey(Budget)
