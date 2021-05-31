from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    class Type(models.TextChoices):
        INCOME = "income", _("Income")
        EXPENSE = "expense", _("Expense")

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=7, choices=Type.choices, default=Type.INCOME)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
