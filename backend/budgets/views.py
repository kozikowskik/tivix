from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Budget, Transaction
from .serializers import BudgetSerializer, TransactionSerializer, UserSerializer


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return self.list(request)

    def perform_create(self, serializer):
        serializer.save(saldo=serializer.validated_data["value"])

    @action(detail=True, methods=["get"])
    def transactions(self, request, pk=None):
        budget = self.get_object()
        serializer = TransactionSerializer(budget.transaction_set.all(), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def users(self, request, pk=None):
        budget = self.get_object()
        serializer = TransactionSerializer(budget.transaction_set.all(), many=True)
        return Response(serializer.data)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        super().perform_create(serializer)

        budget = serializer.instance.budget
        budget.saldo += serializer.instance.get_saldo_value()
        budget.save()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
