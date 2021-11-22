from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.viewsets import GenericViewSet, ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from api.serializers import *
import requests
from app.settings import NOMICS_API_KEY, NOMICS_API_ROOT

class TestViewSet(ViewSet):
    def retrieve(self, request, pk=None):
        response = requests.get(f'{NOMICS_API_ROOT}/currencies/ticker?key={NOMICS_API_KEY}&ids=BTC,ETH,XRP&interval=1d&convert=EUR&per-page=100&page=1')

        return Response(response.json())


class CoinViewSet(ModelViewSet):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer

    def list(self, request):
        serializer = CoinSerializer(self.queryset, many=True)
        ticker_list = ','.join([coin.ticker for coin in self.queryset])
        coin_stats_dict = requests.get(f'{NOMICS_API_ROOT}/currencies/ticker?key={NOMICS_API_KEY}&ids={ticker_list}&interval=1d&convert=EUR&per-page=100&page=1').json()
        coin_db = serializer.data 

        for coin in coin_db:
            for coin_data in coin_stats_dict:
                if coin['ticker'] == coin_data['id']:
                    coin['stats'] = {
                        'price': coin_data['price'],
                        'high': coin_data['high'],
                        'volume': coin_data['1d']['volume'],
                        'volume_change_pct': coin_data['1d']['volume_change_pct'],
                        'price_change': coin_data['1d']['price_change'],
                        'price_change_pct': coin_data['1d']['price_change_pct']
                    }

        return Response(coin_db)


class PortfolioViewSet(GenericViewSet, mixins.ListModelMixin):
    # Provide the default mixin for listing and getting Portfolio objects
    serializer_class = PortfolioSerializer

    def get_queryset(self):
        user = self.request.user
        return Portfolio.objects.filter(user_id=User.objects.first().id)


    def retrieve(self, request, pk=None):
        ticker = get_object_or_404(self.get_queryset(), coin_id=pk)
        serializer = PortfolioSerializer(ticker)

        return Response(serializer.data)


    def create(self, request):
        data = {'user': User.objects.first().id, 'coin': request.data['ticker'], **request.data}
        serializer = PortfolioSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


    def update(self, request, pk=None):
        portfolio = get_object_or_404(self.get_queryset(), coin_id=pk)
        serializer = PortfolioSerializer(portfolio, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    



 
    




    









