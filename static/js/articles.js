$(document).ready(addListeners);

function addListeners()
{
  $('#createButton').click(submitForm);
}

function submitForm()
{
  var serializedData = $('#createArticleForm').serialize();
  //console.log('clicked');

  $.ajax(
    {
      url: '',
      data: serializedData,
      type: 'post',
      success: function(data)
      {
        console.log(data);
        $('#articleList').append('<div class="row my-3"><div class="col"><div class="card"><div class="card-body"<h4 class="card-title"> ' + data.article.headline + '</h4><h6 class="card-text"> ' + data.article.subheading + '</h6><p> Published ' + data.article.date +'</p><button type="button" class="btn btn-outline-danger btn-sm" id="deleteButton">Delete</button></div></div></div></div>');
      }
    });
}
