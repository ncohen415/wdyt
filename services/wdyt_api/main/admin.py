from django.contrib import admin
from main.models import (
    CustomUser,
    Question,
    Answer,
    MultipleChoiceOption
)


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    pass

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    pass

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass

@admin.register(MultipleChoiceOption)
class MultipleChoiceOptionAdmin(admin.ModelAdmin):
    pass
