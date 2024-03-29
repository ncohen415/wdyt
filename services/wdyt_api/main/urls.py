"""wdyt_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import  TokenRefreshView, TokenVerifyView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from main.views.auth_views import (VerifyView, ObtainTokenPairWithColorView, LogoutAndBlacklistRefreshTokenForUserView)
from main.views.model_views import (CustomUserViewSet, QuestionViewSet, MultipleChoiceOptionViewSet)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"custom-users", CustomUserViewSet, basename="custom-users")
router.register(r"questions", QuestionViewSet, basename="questions")
router.register(r"multiple-choice-options", MultipleChoiceOptionViewSet, basename="multiple-choice-options")

urlpatterns = [
    # LOGIN
    path("token/obtain/", ObtainTokenPairWithColorView.as_view(), name="token_obtain"),
    # VERIFY
    path("token/verify/", VerifyView.as_view(), name="token_verify"),
    # REFRESH
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # LOGOUT
    path("blacklist/", LogoutAndBlacklistRefreshTokenForUserView.as_view(), name="blacklist"),
    path("", include(router.urls)),
]
