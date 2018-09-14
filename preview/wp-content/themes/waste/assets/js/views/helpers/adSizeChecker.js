gs.adSizeCheck = function() { 
   $(".ad iframe").each(function() {
        if($(this)[0].width > $(".container").width()) {
            if(!$(this).parent().hasClass('hide-ad')){
                console.log("hide ad");
                $(this).parent().addClass("hide-ad");
            }
        } else {
            if($(this).parent().hasClass('hide-ad')){
                console.log("un hide ad");
                $(this).parent().removeClass("hide-ad");
            }
        }
    });
}