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
    multiple_choice_options = serializers.SerializerMethodField()

    def get_response_types(self, instance):
        to_json_array = [tup[0] for tup in RESPONSE_TYPES]
        return to_json_array
    
    def get_multiple_choice_options(self, instance):
        choices = []
        multiple_choice_options = MultipleChoiceOption.objects.filter(question_id=instance.id)
        if len(multiple_choice_options) > 0:
            for option in multiple_choice_options:
                choices.append({"option": option.option, "id": option.id})
        # return MultipleChoiceOptionSerializer(choices, many=True).data
        return choices
    

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