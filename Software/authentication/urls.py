from django.urls import path
from .views import login_view, current_user_view, logout_view
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', login_view, name='login'),
    path('user/', current_user_view, name='current_user'),
    path('logout/', logout_view, name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
