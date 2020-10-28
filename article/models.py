from django.db import models
from django.utils import timezone

# Model for a source, stores details about the source itself
class Source(models.Model):
    name = models.CharField(max_length=100, default='Google')
    url = models.URLField(default='https://www.google.com')
    reliable = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# Model for an article, stores details about the article itself
class Article(models.Model):
    headline = models.CharField(max_length=255, default='Default headline')
    subheading = models.TextField(default='Default subheading')
    date = models.DateTimeField(default=timezone.now)
    #source = models.ManyToManyField(Source)
    #id = models.IntegerField(primary_key=True, Unique=True)

    def __str__(self):
        return self.headline
