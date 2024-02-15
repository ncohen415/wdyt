from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from main.models import (
    CustomUser
)

class CustomUserSerializer(serializers.ModelSerializer):


    class Meta:
        model = CustomUser
        fields =   [
            "id",
            "first_name",
            "last_name",
            "phone",
            "email",
        ]
        depth = 0


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Custom data you want to include
        if self.user:
            data.update({"user": CustomUserSerializer(self.user).data})

        return data
