# Generated by Django 2.1.1 on 2018-09-20 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0005_flights_pic_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='aircraft',
            name='photo',
            field=models.ImageField(default='https://qph.fs.quoracdn.net/main-qimg-721f8fad881515f2e901f6a68151cd55-c', upload_to='aircraft'),
        ),
    ]
