# Generated by Django 3.2.9 on 2021-11-17 17:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_auto_20211117_1739'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolio',
            name='coin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='portfolios', to='api.coin'),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='portfolios', to=settings.AUTH_USER_MODEL),
        ),
    ]