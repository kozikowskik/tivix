from decimal import Decimal

from rest_framework import serializers
from djmoney.contrib.django_rest_framework import MoneyField

from .models import Budget, Transaction


class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    shared = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = (
            "id",
            "name",
            "user",
            "value",
            "saldo",
            "shared_with",
            "shared",
        )
        read_only_fields = ("shared_with", "shared")

    def get_shared(self, obj):
        return getattr(obj, "shared", False)


class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    category_name = serializers.SerializerMethodField()
    transaction_type_name = serializers.SerializerMethodField()
    value = MoneyField(
        max_digits=14,
        decimal_places=2,
    )
    signed_value = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = [
            "id",
            "name",
            "value",
            "user",
            "budget",
            "transaction_type",
            "category",
            "category_name",
            "transaction_type_name",
            "created_at",
            "signed_value",
        ]

    def get_category_name(self, obj):
        return obj.category.name

    def get_transaction_type_name(self, obj):
        return obj.get_transaction_type_display()

    def get_signed_value(self, obj):
        return (1 if obj.transaction_type == Transaction.Type.INCOME else -1) * Decimal(
            obj.value.amount
        )
