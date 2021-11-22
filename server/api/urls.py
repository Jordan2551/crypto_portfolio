from django.urls import path, include
from rest_framework import routers
from api.views import *

router = routers.SimpleRouter()
router.register('coins', CoinViewSet, 'coins')
router.register('protfolios', PortfolioViewSet, 'protfolios')
router.register('test', TestViewSet, 'test')

urlpatterns = router.get_urls()
