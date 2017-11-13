from django.contrib import admin
from .models import SelectedApp


class SelectedAppAdmin(admin.ModelAdmin):
    pass


admin.site.register(SelectedApp, SelectedAppAdmin)
