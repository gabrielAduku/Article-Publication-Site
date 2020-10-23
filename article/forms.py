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

#class ArticleForm(forms.Form):
#    headline = forms.CharField(label='Headline', max_length=255, widget=forms.TextInput(attrs={'class':'form-control'}))
#    subheading = forms.CharField(label='Subheading', widget=forms.TextInput(attrs={'class':'form-control'}))
