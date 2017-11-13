# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_manager', '0005_delete_apptag'),
    ]

    operations = [
        migrations.CreateModel(
            name='SelectedApp',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('app', models.OneToOneField(null=True, blank=True, to='app_manager.App')),
            ],
        ),
    ]
