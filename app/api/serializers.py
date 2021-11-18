from django.core.exceptions import ValidationError
from rest_framework import serializers
from api.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = '__all__'


class PortfolioSerializer(serializers.ModelSerializer):
    coin = serializers.PrimaryKeyRelatedField(queryset=Coin.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Portfolio
        fields = '__all__'

        

    




    
