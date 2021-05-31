from django.contrib.auth.models import User
from django.db import models

from djmoney.models.fields import MoneyField

from categories.models import Category


class Budget(models.Model):
    name = models.CharField(max_length=255)
    value = MoneyField(max_digits=14, decimal_places=2, default_currency="USD")
    saldo = MoneyField(
        max_digits=14, decimal_places=2, default_currency="USD", default=0
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shared_with = models.ManyToManyField(User, related_name="shared_with_users")

    class Meta:
        ordering = ["-pk"]

    def __str__(self):
        return self.name


class Income(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Expense(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
