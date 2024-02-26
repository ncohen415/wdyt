from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    def handle(self,*args, **kwargs):
        print("starting reset")

        print("flushing database")
        call_command("reset_db")
        print("database cleared")

        print("running migrations")
        call_command("migrate")
        print("migrations finished")

        print("creating superusers")
        UserModel = get_user_model()
        user_n = UserModel.objects.create_superuser(
            first_name="Nate",
            last_name="Cohen",
            email="nate.cohen415@gmail.com",
            password="abcd!1234",
            is_staff=True
        )
        user_a = UserModel.objects.create_superuser(
            first_name="Abe",
            last_name="Post-Hyatt",
            email="abeposthyatt@gmail.com",
            password="abcd!1234",
            is_staff=True
        )
        print("superusers created")

        print("reset complete")



