from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Budget, Transaction


class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Budget
        fields = ("id", "name", "user", "value", "saldo", "shared_with")
        read_only_fields = ("shared_with",)


class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    category_name = serializers.SerializerMethodField()
    transaction_type_name = serializers.SerializerMethodField()

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
        ]

    def get_category_name(self, obj):
        return obj.category.name

    def get_transaction_type_name(self, obj):
        return obj.get_transaction_type_display()
