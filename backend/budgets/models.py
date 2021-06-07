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
    shared_with = models.ManyToManyField(
        User, related_name="shared_with_users"
    )

    class Meta:
        ordering = ["-pk"]

    def __str__(self):
        return self.name

    def if_owner(self, user):
        return self.user.pk == user.pk


class Transaction(models.Model):
    class Type(models.TextChoices):
        INCOME = "income", "Income"
        EXPENSE = "expense", "Expense"

    name = models.CharField(max_length=255)
    value = MoneyField(max_digits=14, decimal_places=2, default_currency="USD")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    transaction_type = models.CharField(
        max_length=7, choices=Type.choices, default=Type.INCOME
    )
    created_at = models.DateTimeField(auto_now_add=True)

    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-pk"]

    def __str__(self):
        return self.name

    def get_saldo_value(self):
        return (
            1 if self.transaction_type == self.Type.INCOME else -1
        ) * self.value
