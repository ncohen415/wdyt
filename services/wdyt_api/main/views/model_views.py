from rest_framework import viewsets
from main.serializers import (CustomUserSerializer, AnswerSerializer, QuestionSerializer, MultipleChoiceOptionSerializer)
from main.models import (CustomUser, Question, MultipleChoiceOption)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    http_method_names = ["get", "list", "post", "patch", "delete"]

    def create(self, request):
        first_name = self.request.data.get("first_name", None)
        last_name = self.request.data.get("last_name", None)
        email = self.request.data.get("email", None)
        phone = self.request.data.get("phone", None)
        password = self.request.data.get("password", None)

        if first_name is not None and last_name is not None and email is not None and phone is not None:

            if len(CustomUser.objects.filter(email=email, archived=False)):
                return Response({"error": "User already exists with this e-mail"}, status=status.HTTP_200_OK)

            elif len(CustomUser.objects.filter(email=email, archived=True)) == 1:
                user = CustomUser.objects.get(email=email, archived=True)
                user.archived = False
                user.first_name = first_name
                user.last_name = last_name
                user.phone = phone
                user.save()

            else:
                user = CustomUser.objects.create_user(
                    email=email,
                    password=password,
                    first_name=first_name,
                    last_name=last_name,
                    phone=phone,
                )

            return Response({"success": "Successfully added user."}, status=status.HTTP_201_CREATED)
        

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    http_method_names = ["get", "list", "post", "patch", "delete"]

    def get_queryset(self):
        queryset = Question.objects.all()
        question_id = self.request.query_params.get("question_id", None)
        asker_id = self.request.query_params.get('asker_id', None)
        if question_id is not None:
            queryset = queryset.filter(id=question_id)

        if asker_id is not None:
            queryset = queryse= queryset.filter(asker_id=asker_id)

        return queryset
        

    def create(self, request):
        title = self.request.data.get("title", None)
        asker = self.request.data.get("asker", None)
        question = None

        if asker is None:
            return Response({"error": "You must have an account to ask questions"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if asker is not None and title is not None:
            question = Question.objects.create(title=title, asker_id=asker)

        if question is not None:
            return Response({"success": "Successfully submitted question", "question_id": QuestionSerializer(question).data["id"]}, status=status.HTTP_201_CREATED)
        

    def update(self, request, *args, **kwargs):
        question_id = self.request.data.get("question_id", None)
        title = self.request.data.get("title", None)
        context = self.request.data.get("context", None)
        response_type = self.request.data.get("response_type", None)
        allow_explanation = self.request.data.get("allow_explanation", None)
        asker = self.request.data.get("asker", None)
        multiple_choice_number_of_options = self.request.data.get("multiple_choice_number_of_options", None)
        confirmed = self.request.data.get("confirmed", None)
        question = Question.objects.get(id=question_id)

        if asker is None:
            return Response({"error": "You must have an account to ask questions"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if title is not None:
            question.title = title
            question.save()

        if context is not None and question is not None:
            question.context = context
            question.save()

        if response_type is not None and question is not None:
            question.response_type = response_type
            question.save()


        if question is not None:
            if allow_explanation is None:
                question.allow_explanation = False
                question.save()
            else:
                question.allow_explanation = allow_explanation
                question.save()

        if multiple_choice_number_of_options is not None and question is not None:
            question.multiple_choice_number_of_options = multiple_choice_number_of_options
            question.save()

        if confirmed is not None:
            question.confirmed = confirmed
            question.save()

        if question is not None:
            return Response({"success": "Successfully updated question"}, status=status.HTTP_201_CREATED)
        

class MultipleChoiceOptionViewSet(viewsets.ModelViewSet):
    queryset = MultipleChoiceOption.objects.all()
    serializer_class = MultipleChoiceOptionSerializer
    http_method_names = ["get", "list", "post", "patch", "delete"]


    def get_queryset(self):
        queryset = MultipleChoiceOption.objects.all()
        question_id = self.request.query_params.get("question_id", None)
        if question_id is not None:
            queryset = queryset.filter(id=question_id)

        return queryset

    def create(self, request):
        question_id = self.request.data.get("question_id", None)
        options = self.request.data.get("options", None)

        if options is not None and question_id is not None:
            for option in options:
                MultipleChoiceOption.objects.create(question_id=question_id, option=option)
            return Response({"success": "Options created"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

            
    @action(detail=False, methods=["post"])
    def update_existing_multiple_choice_options(self, request):
        question_id = self.request.data.get("question_id", None)
        options = self.request.data.get("options", None)

        if options is not None and question_id is not None:
            for option in options:
                option_to_update = MultipleChoiceOption.objects.get(id=option["id"])
                option_to_update.option = option["option"]
                option_to_update.save()
            return Response({"success": "Options created"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


