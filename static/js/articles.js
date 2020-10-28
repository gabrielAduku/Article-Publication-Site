$(document).ready(addListeners);

var currentlyEditing;
var currentlyViewing;

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function addListeners()
{
  $('#createButton').click(submitForm);
  $('.btn-outline-danger').on('click', deleteArticle);
  $('#finishEditButton').click(finishEdit);
  $('[id=modalButton]').on('click', function()
  {
    console.log("hello");
    currentlyEditing = $(this).closest('div[name="article"]');
  });
  $('[id=viewButton]').on('click', function()
  {
    console.log("Viewed");
    currentlyViewing = $(this).closest('div[name="article"]');
    getArticle();
  });
}

function getArticle()
{
  var articleID = currentlyViewing.data('id');
  var articleData = {'id' : articleID}
  $.ajax
  ({
      url: 'get/',
      data: {'id' : articleID},
      id: articleData,
      method: 'GET',
      success: function(data)
      {
        console.log(data)
        currentlyViewing.find('[name=headline]').append(`<h6 class="card-text" name="subheading">`+data.subheading+`</h6>
        <p class="card-text" name="date"> Published `+data.date+`</p>`);
      }
  });
}

function submitForm()
{
  var serializedData = $('#createArticleForm').serialize();
  //console.log('clicked');
  console.log(serializedData);
  $.ajax
  ({
      url: '',
      data: serializedData,
      method: 'post',
      success: function(data)
      {
        console.log(data);
        //$('#articleList').append('<div class="row my-3"><div class="col"><div class="card"><div class="card-body"<h4 class="card-title"> ' + data.article.headline + '</h4><h6 class="card-text"> ' + data.article.subheading + '</h6><p> Published ' + data.article.date +'</p><button type="button" class="btn btn-outline-danger btn-sm" id="deleteButton">Delete</button></div></div></div></div>');
        newArticle = `
        <div name="article" data-id="` + data.article.id +`">
          <div class="row my-3">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title" name="headline"> `+ data.article.headline +` </h4>
                  <button type="button" class="btn btn-outline-primary btn-sm" id="viewButton">View</button>
                  <button type="button" class="btn btn-outline-danger btn-sm" id="deleteButton">Delete</button>

                  <!-- Modal Trigger -->
                  <button type="button" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#editModal" id="modalButton" data-id="`+ data.article.id +`">Edit Article</button>
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
  var article = $(this).closest('div[name="article"]');
  //console.log(articleId);

  // Perform Ajax deletion request
  $.ajax
  ({
    url: '/' + article.data('id') + '/deleted/',
    data: article.data('id'),
    beforeSend: function(xhr) {
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    },
    method: 'DELETE',
    datatype: 'json',
    success: function(data)
    {
      // Remove parent
      if (data.deleted == "OK")
      {
        console.log("REMOVE::RESPONSE OK");
        article.remove();
      }
    }
  });
}

function finishEdit()
{
  //editData = $('#editArticleForm').serialize();

  var headline = $('input[id=headline]').val();
  var subheading = $('input[id=subheading]').val();
  var date = $('input[id=date]').val();
  var id = currentlyEditing.data('id');

  console.log(headline);
  console.log(subheading);
  console.log(date);
  console.log(id);

  var editData = {
    'headline': headline,
    'subheading': subheading,
    'date': date,
    'id': id,
}

  $.ajax
  ({
    url: '/' + currentlyEditing.data('id') + '/edited/',
    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
    beforeSend: function(xhr) {
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    },
    data: editData,
    method: 'PUT',
    success: function(data)
    {
      if (data.edited == "OK")
      {
          var headlineEl = currentlyEditing.find('h4[name=headline]');
          var subheadingEl = currentlyEditing.find('h6[name=subheading]');
          var dateEl = currentlyEditing.find('p[name=date]');

          console.log(currentlyEditing);

          headlineEl.html(headline);
          subheadingEl.html(subheading);
          dateEl.html(date);

      }
      else
      {
          console.log("EDIT::RESPONSE FAIL");
      }
    }
  });
}
