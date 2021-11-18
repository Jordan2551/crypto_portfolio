from django.urls import path, include
from rest_framework import routers
from api.views import *

router = routers.SimpleRouter()
router.register('coins', CoinViewSet, 'coins')
router.register('protfolios', PortfolioViewSet, 'protfolios')

urlpatterns = router.get_urls()
