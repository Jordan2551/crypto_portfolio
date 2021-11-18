from django.db import models

class Coin(models.Model):
    ticker = models.CharField(max_length=3, primary_key=True, db_index=True)
    name = models.CharField(max_length=20)


class Portfolio(models.Model):
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE, db_index=True, related_name="portfolios")
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, db_index=True, related_name="portfolios")
    amount = models.DecimalField(decimal_places=2, max_digits=10)

    class Meta:
        unique_together = ['user', 'coin']


