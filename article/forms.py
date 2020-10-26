from django.forms import ModelForm
from django import forms
from .models import *

class ArticleForm(ModelForm):
    class Meta:
        model = Article
        fields = ['headline', 'subheading', 'date']

        widgets = {
            'headline' : forms.TextInput(attrs={'class': 'form-control'}),
            'subheading' : forms.TextInput(attrs={'class': 'form-control'}),
            'date' : forms.TextInput(attrs={'class': 'form-control'}),
        }
    #author = forms.ModelMultipleChoiceField(queryset=Author.objects.all(), widget=forms.CheckboxSelectMultiple)

class ArticleEditForm(ModelForm):
    class Meta:
        model = Article
        fields = ['headline', 'subheading', 'date']
        widgets = {
            'headline' : forms.TextInput(attrs={'class': 'form-control', 'id' : 'headline'}),
            'subheading' : forms.TextInput(attrs={'class': 'form-control', 'id' : 'subheading'}),
            'date' : forms.TextInput(attrs={'class': 'form-control', 'id' : 'date'}),
        }
