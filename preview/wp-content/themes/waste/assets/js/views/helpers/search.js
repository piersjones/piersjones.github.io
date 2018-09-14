gs.searchTrigger = function() {
    if($('#home').length > 0) {
        gs.searchOpenClose();
    } else {
        $('#search-icon').on('click', function () {
            gs.searchOpenClose();
        });
    }
    gs.searchListener();

}

gs.searchListener = function(){
    $('#keyword').keyup(function() {
        if(this.value.length === 0) {
            $('#datafetch').html('');
        } else if( this.value.length < 3 ) {
            return;
        } 
        gs.searchCall();
    });
}

gs.searchOpenClose = function() {
    if(gs.searchOpen) {
        gs.centerBounceOut();
        TweenMax.to($('#search-bar'), 0.5, { delay: 0.3, css: {right: '-100%'}, ease: Back.ease});
        gs.searchOpen = false;
    } else {
        $(this).addClass('search-open');
        TweenMax.to($('#search-bar'), 0.5, { css: {right: '0%'}, ease: Back.ease, onComplete: gs.centerBounceIn});
        gs.searchOpen = true;
    }
}

gs.searchCall = function() {
    if($('#keyword').val()) {
        $.ajax({
            url: my_ajaxurl,
            type: 'post',
            data: { action: 'search_data_fetch', keyword: $('#keyword').val() },
            success: function(data) {
                if(data.length === 0){
                    $('#datafetch').html("Try again!");
                } else {
                    $('#datafetch').html( data );
                }
            }
        });
    }
}