from rest_framework import viewsets
from main.serializers import CustomUserSerializer
from main.models import CustomUser
from rest_framework.response import Response
from rest_framework import status

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