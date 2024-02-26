from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from main.models import (
    CustomUser,
    Question,
    Answer,
    MultipleChoiceOption
)
from main.choices.choices import (
    RESPONSE_TYPES

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
            "slug"
        ]
        depth = 0


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Custom data you want to include
        if self.user:
            data.update({"user": CustomUserSerializer(self.user).data})

        return data

class QuestionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Question
        fields = "__all__"
        depth = 2

    response_types = serializers.SerializerMethodField()
    asker = CustomUserSerializer()

    def get_response_types(self, instance):
        # [{'key': tup[0], 'value': tup[1]} for tup in tuple_of_tuples]
        to_json_array = [tup[0] for tup in RESPONSE_TYPES]
        return to_json_array
    

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"
        depth = 2

class MultipleChoiceOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceOption
        fields = "__all__"
        depth = 1