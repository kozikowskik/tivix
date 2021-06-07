from django import forms
from django.contrib import admin

from budgets.models import Budget, Transaction


class BudgetAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["shared_with"].queryset = self.fields[
            "shared_with"
        ].queryset.exclude(pk=self.user.pk)


class BudgetAdmin(admin.ModelAdmin):
    form = BudgetAdminForm

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj, change, **kwargs)
        form.user = request.user
        return form


admin.site.register(Budget, BudgetAdmin)
admin.site.register(Transaction)
