from rest_framework import serializers

from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Budget
        fields = ["pk", "name", "user", "value", "saldo"]
