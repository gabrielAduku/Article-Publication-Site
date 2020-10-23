from django.db import models
from django.utils import timezone

# Model for an article Author, stores detail about the Author
class Author(models.Model):
    name = models.CharField(max_length=100, default='John Doe')
    role = models.TextField(default='Reporter')

    def __str__(self):
        return self.name + ", " + self.role

# Model for an article, stores details about the article itself
class Article(models.Model):
    headline = models.CharField(max_length=255, default='Default headline')
    subheading = models.TextField(default='Default subheading')
    date = models.DateTimeField(default=timezone.now)
    author = models.ManyToManyField(Author)
    #id = models.IntegerField(primary_key=True, Unique=True)

    def __str__(self):
        return self.headline
