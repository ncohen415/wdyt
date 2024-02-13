from django.contrib import admin
from main.models import (
    CustomUser
)


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    pass
