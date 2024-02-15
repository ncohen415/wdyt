from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseForbidden
from main.serializers import (CustomUserSerializer, MyTokenObtainPairSerializer)

class VerifyView(APIView):

    http_method_names = ["post"]

    def post(self, request, format=None):
        auth = JWTAuthentication()
        auth_result = auth.authenticate(request)
        if auth_result:
            user, _ = auth_result
            refresh_token = RefreshToken.for_user(user)
            resp = Response(
                {
                    "access": str(refresh_token.access_token),
                    "refresh": str(refresh_token),
                    "user": CustomUserSerializer(request.user).data
                    if request.user
                    else None,
                    "success": True,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            resp = HttpResponseForbidden()

        return resp


class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = []
    permissions = {
        "post": {
            "public": True
        }
    }
    authentication_classes = ()

    def post(self, request):
        try:
            r_token = RefreshToken(request.data["refresh_token"])
            r_token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
