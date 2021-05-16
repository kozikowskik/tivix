from django.contrib import admin

from budgets.models import Budget, Expense, Income

# Register your models here.
admin.site.register(Budget)
admin.site.register(Income)
admin.site.register(Expense)
