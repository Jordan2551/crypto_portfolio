from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.viewsets import GenericViewSet, ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from api.serializers import *

class CoinViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer


class PortfolioViewSet(GenericViewSet, mixins.ListModelMixin):
    # Provide the default mixin for listing and getting Portfolio objects
    permission_classes = [IsAuthenticated]
    serializer_class = PortfolioSerializer

    def get_queryset(self):
        user = self.request.user
        return Portfolio.objects.filter(user_id=user.id)


    def retrieve(self, request, pk=None):
        ticker = get_object_or_404(self.get_queryset(), coin_id=pk)
        serializer = PortfolioSerializer(ticker)

        return Response(serializer.data)


    def create(self, request):
        data = {'user': request.user.id, 'coin': request.data['ticker'], **request.data}
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

    



 
    




    









