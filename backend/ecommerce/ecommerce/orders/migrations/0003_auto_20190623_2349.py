# Generated by Django 2.2 on 2019-06-23 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20190623_2349'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='nubmerOfBuliding',
            field=models.CharField(blank=True, max_length=5),
        ),
        migrations.AlterField(
            model_name='order',
            name='streetName',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]