# Generated by Django 3.1.2 on 2020-10-28 19:10

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Google', max_length=100)),
                ('url', models.URLField(default='https://www.google.com')),
                ('reliable', models.BooleanField(default=False)),
            ],
        ),
        migrations.DeleteModel(
            name='Author',
        ),
        migrations.AlterField(
            model_name='article',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='article',
            name='author',
            field=models.ManyToManyField(to='article.Source'),
        ),
    ]
