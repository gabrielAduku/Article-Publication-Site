from django.shortcuts import render, redirect
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse, QueryDict
from django.forms.models import model_to_dict

from .forms import *
import json

def articleGet(request):
    if request.method == "GET":
        article = Article.objects.get(pk=request.GET['id'])

        return JsonResponse({'headline' : article.headline, 'subheading' : article.subheading, 'date' : article.date}, status=200)


class ArticleList(View):
    def get(self, request):
        articleForm = ArticleForm()
        editForm = ArticleEditForm()
        articles = Article.objects.all()
        return render(request, 'articles.html', {'articleForm' : articleForm, 'editForm': editForm, 'articles' : articles})

    def post(self, request):
        form = ArticleForm(request.POST)
        print(form)
        if form.is_valid():
            article = form.save()
            return JsonResponse({'article': model_to_dict(article)}, status=200)
        return redirect('article_list_url')

class ArticleDelete(View):
    def delete(self, request, id):
        article = Article.objects.get(pk=id)
        article.delete()
        return JsonResponse({'deleted' : 'OK'}, status=200)

# Handles editing articles
class ArticleEdit(View):
    def put(self, request, id):
        putParam = QueryDict(request.body)
        print(putParam)
        h = putParam.__getitem__('headline')
        s = putParam.__getitem__('subheading')
        d = putParam.__getitem__('date')
        id = putParam.__getitem__('id')

        article = Article.objects.get(pk=id)
        article.headline = h
        article.subheading = s
        article.date = d
        article.save()

        return JsonResponse({'edited' : 'OK', 'headline': h, 'subheading': s, 'date': d, 'id': id}, status=200)
        """editForm = ArticleForm(request.POST)

        if editForm.is_valid():
            print("Debug: Form is valid")
            # No Logic here yet
            print(editForm)
            return JsonResponse({'edited' : 'OK'}, status=200)
        else:
            print(editForm.errors)
            return JsonResponse({'edited' : 'FAIL'}, status=200)"""
