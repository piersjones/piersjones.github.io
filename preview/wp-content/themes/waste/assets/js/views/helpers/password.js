gs.passwordCheck = function() { 
    $("#password-form").submit(function(e) {
        e.preventDefault();
        gs.unlock();
         $('#submit').prop('disabled', true);
    });

    $("#password").focus(function() {
        $('#error').html('');   
    }); 
}

gs.unlock = function(){
    var passwordInput = $("#password").val();
    var term_type = $("#password-form").attr('data-term');
    var term_slug = $("#password-form").attr('data-termslug');
    var term_id = $("#password-form").attr('data-termID');

    jQuery.ajax({
        url: my_ajaxurl,
        type: 'post',
        data: { action: 'password_unlock', term: term_type, termSlug: term_slug, termID: term_id, password: passwordInput},
        success: function(data) {   
            var content = JSON.parse(data);
            if(content.success) {
                jQuery('#password-form').hide();  
                if(content.tags.length > 0){
                    jQuery('#content').append('<div class="mtb20">');
                    content.tags.forEach(function(tag) {
                        jQuery('#content').append(
                            '<a class="sub-cat-btn btn" href="' + tag.link + '">' + tag.name + '</a>'
                        );
                    });
                    jQuery('#content').append('</div>');
                }
                if(content.posts){
                    content.posts.forEach(function(entry) {
                        jQuery('#content').append(
                            '<div class="mtb20">'+gs.categoryList(entry.categories)+'<a href="' + entry.link + '">' + entry.title + '</a>'
                        );
                    });
                }
            } else {
                console.log(content);
               jQuery('#error').html('<div class="wrong">Wrong Password</div>');   
               jQuery('#submit').prop('disabled', false);
               jQuery("#password").val('');
            }
        }
    });
    return false;
}

gs.categoryList = function(cats) {
    if(cats.parent){
        return cats.ancestors.join('') + cats.parent;
    } else {
        return cats.ancestors.join('');
    }
}