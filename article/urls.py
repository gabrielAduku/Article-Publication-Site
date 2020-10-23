from django.urls import path, include

from .views import *

urlpatterns = [
    path('', ArticleList.as_view(), name='article_list_url'),
    path('<str:id>/deleted/', ArticleDelete.as_view(), name='article_delete_url'),
]
