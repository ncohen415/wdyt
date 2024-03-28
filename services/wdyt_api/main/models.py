# IMPORTS
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import uuid
from .managers import CustomUserManager
from main.choices.choices import (
    RESPONSE_TYPES,
    YES_NO_OPTIONS
)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(blank=True, max_length=150, verbose_name='first name')
    last_name = models.CharField(blank=True, max_length=150, verbose_name='last name')
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    archived = models.BooleanField(default=False)
    slug = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone", "is_staff"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Question(models.Model):

    title = models.CharField(max_length=300)
    context = models.TextField()
    response_type = models.CharField(default=None, choices=RESPONSE_TYPES, max_length=150, blank=True, null=True)
    asker = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    allow_explanation = models.BooleanField(default=True, null=True, blank=True)
    multiple_choice_number_of_options = models.IntegerField(blank=True, null=True)
    confirmed = models.BooleanField(default=False, blank=True, null=True)

    # get answers through serializer

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answerer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    words_only_answer = models.TextField(blank=True, null=True)
    multiple_choice_answer = models.CharField(max_length=200, blank=True, null=True)
    yes_no_answer = models.CharField(max_length=200, blank=True, null=True, choices=YES_NO_OPTIONS)
    created_at = models.DateTimeField(auto_now_add=True)
    # sentiment

class MultipleChoiceOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.CharField(max_length=200, blank=True, null=True)