# Generated by Django 4.2.10 on 2024-02-16 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='archived',
            field=models.BooleanField(default=False),
        ),
    ]
