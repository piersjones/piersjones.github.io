gs.ajaxcomment = function(){
    var commentform=$('#commentform');
    commentform.prepend('<div id="comment-status" ></div>');
    var statusdiv = $('#comment-status');

    commentform.submit(function(){
      // Serialize and store form data
      var formdata = commentform.serialize();

      //Add a status message
      statusdiv.html('<p class="ajax-placeholder">Processing...</p>');
      //Extract action URL from commentform
      var formurl = commentform.attr('action');


      //Post Form with data
      $.ajax({
        type: 'post',
        url: formurl,
        data: formdata,
        error: function(XMLHttpRequest, textStatus, errorThrown){
          statusdiv.html('<p class="ajax-error" >You might have left one of the fields blank, or be posting too quickly</p>');
        },
        success: function(data, textStatus, errorThrown){
            console.log(textStatus, errorThrown);

          if(textStatus == "success") {
            statusdiv.html('<p class="ajax-success" >Thanks for your comment. We appreciate your response.</p>');
          } else {
            statusdiv.html('<p class="ajax-error" >Please wait a while before posting your next comment</p>');
            commentform.find('textarea[name=comment]').val('');
          }
        }
      });
      return false;
    });
}