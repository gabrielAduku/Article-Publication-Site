$(document).ready(addListeners);

function addListeners()
{
  $('#createButton').click(submitForm);
  $('.btn-outline-danger').on('click', deleteArticle);
}

function submitForm()
{
  var serializedData = $('#createArticleForm').serialize();
  //console.log('clicked');

  $.ajax
  ({
      url: '',
      data: serializedData,
      type: 'post',
      success: function(data)
      {
        console.log(data);
        //$('#articleList').append('<div class="row my-3"><div class="col"><div class="card"><div class="card-body"<h4 class="card-title"> ' + data.article.headline + '</h4><h6 class="card-text"> ' + data.article.subheading + '</h6><p> Published ' + data.article.date +'</p><button type="button" class="btn btn-outline-danger btn-sm" id="deleteButton">Delete</button></div></div></div></div>');
        newArticle = `<div name="article" data-id="` + data.article.id +`">
          <div class="row my-3">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title"> `+ data.article.headline +` </h4>
                  <h6 class="card-text"> ` + data.article.subheading + ` </h6>
                  <p class="card-text"> Published ` + data.article.date + `</p>
                  <button type="button" class="btn btn-outline-danger btn-sm" id="deleteButton">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

        $('#articleList').append(newArticle);
        addListeners();
      }
    });
}

function deleteArticle()
{
  // Pass along current CSRF Token
  var csrfToken = $('input[name=csrfmiddlewaretoken]').val();

  // Get current article ID
  article = $(this).closest('div[name="article"]');
  //console.log(articleId);

  // Perform Ajax deletion request
  $.ajax
  ({
    url: '/' + article.data('id') + '/deleted/',
    data: {csrfmiddlewaretoken: csrfToken, id: article.data('id')},
    type: 'post',
    datatype: 'json',
    success: function(data)
    {
      // Remove parent
      if (data.deleted == "successful")
      {
        article.remove();
      }
    }
  });
}
