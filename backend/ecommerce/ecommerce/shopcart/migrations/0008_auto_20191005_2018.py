# Generated by Django 2.2 on 2019-10-05 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_auto_20190817_2256'),
        ('shopcart', '0007_auto_20190719_2259'),
    ]

    operations = [
        migrations.CreateModel(
            name='productObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
        migrations.AlterField(
            model_name='shopcart',
            name='shopCartProduct',
            field=models.ManyToManyField(blank=True, to='shopcart.productObject'),
        ),
    ]