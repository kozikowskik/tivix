from django.contrib.auth.models import User
from django.shortcuts import render
from django.db.models import Q
from django.db.models import Case, When, Value, IntegerField, BooleanField

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Budget, Transaction
from .serializers import BudgetSerializer, TransactionSerializer


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def get_queryset(self):
        qs = (
            super()
            .get_queryset()
            .filter(Q(user=self.request.user) | Q(shared_with__in=[self.request.user]))
            .annotate(
                shared=Case(
                    When(user_id=self.request.user.pk, then=Value(False)),
                    default=Value(True),
                )
            )
        )
        return qs

    def update(self, request, pk=None):
        budget = self.get_object()
        if not budget.is_owner(request.user):
            return Response(
                "You can not update not yours budget.",
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().update(request, pk)

    def partial_update(self, request, pk=None):
        budget = self.get_object()
        if not budget.is_owner(request.user):
            return Response(
                "You can not partialy update not yours budget.",
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().partial_update(request, pk)

    def destroy(self, request, pk=None):
        budget = self.get_object()
        if not budget.is_owner(request.user):
            return Response(
                "You can not delete not yours budget.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        super().destroy(request, pk)
        return self.list(request)

    def perform_create(self, serializer):
        serializer.save(saldo=serializer.validated_data["value"])

    @action(detail=True, methods=["get"])
    def transactions(self, request, pk=None):
        budget = self.get_object()
        data = self.paginate_queryset(budget.transaction_set.all())
        serializer = TransactionSerializer(data, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=["post"])
    def share(self, request, pk=None):
        budget = self.get_object()
        if not budget.is_owner(request.user):
            return Response(
                "You can not share not yours budget.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        checked = request.data.get("checked", False)
        try:
            user_id = request.data.get("userId")
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response("User does not exist.", status=status.HTTP_404_NOT_FOUND)

        if checked:
            budget.shared_with.add(user)
        else:
            budget.shared_with.remove(user)
        return Response({})


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(
                Q(user=self.request.user)
                | Q(budget__shared_with__in=[self.request.user])
            )
        )

    def perform_create(self, serializer):
        super().perform_create(serializer)

        budget = serializer.instance.budget
        budget.saldo += serializer.instance.get_saldo_value()
        budget.save()
