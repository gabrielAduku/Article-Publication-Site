from django.shortcuts import render, redirect
from django.views.generic import View

from django.http import JsonResponse
from django.forms.models import model_to_dict

from .forms import *

class ArticleList(View):
    def get(self, request):
        form = ArticleForm()
        articles = Article.objects.all()
        return render(request, 'articles.html', {'form' : form, 'articles' : articles})


    def post(self, request):
        form = ArticleForm(request.POST)

        if form.is_valid():
            article = form.save()
            return JsonResponse({'article': model_to_dict(article)}, status=200)
        return redirect('article_list_url')

class ArticleDelete(View):
    def post(self, request, id):
        article = Article.objects.get(pk=id)
        article.delete()
        return JsonResponse({'deleted' : 'successful'}, status=200)
