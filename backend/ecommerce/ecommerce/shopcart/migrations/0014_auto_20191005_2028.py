# Generated by Django 2.2 on 2019-10-05 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopcart', '0013_auto_20191005_2027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productobject',
            name='quantity',
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]