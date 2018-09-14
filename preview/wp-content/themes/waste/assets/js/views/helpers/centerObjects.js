gs.center = document.getElementsByClassName("center-content");

gs.centerStartPosition = function() {
    if(gs.center.length > 0){
        for (var i = 0; i < gs.center.length; ++i) {
            gs.item = gs.center[i];  
            gs.item.visable = false;
            TweenMax.set(gs.item, { css: {top: window.innerHeight, left: (window.innerWidth/2) - (gs.item.offsetWidth/2) } } );
        }
    }
}

gs.centerBounceIn = function () {
    if(gs.item){
        TweenMax.to(gs.item, 0.8, { css: {top: (window.innerHeight/2) - (gs.item.offsetHeight/2), opacity: 1}, ease: Back.easeOut, onComplete: gs.centerShrink});
        gs.item.visable = true;
    }
}

gs.centerBounceOut = function() {
    if(gs.item){
        console.log("im out of here");
        TweenMax.to(gs.item, 0.8, { css: {top: (window.innerHeight) + (gs.item.offsetHeight)}, ease: Back.easeOut, onComplete:function(){
            gs.item.style.opacity = 0;
        }});
        gs.item.visable = false;
    }
}

gs.centerShrink = function() {
    if(gs.item){
        console.log("im shrinkinngg");
        TweenMax.to(gs.item, 0.8, { scale: 0.9, ease: Back.easeOut });
    }
}

gs.centerOnResize = function () {
    if(gs.center.length > 0 && gs.item.visable){
        for (var i = 0; i < gs.center.length; ++i) {
            TweenMax.to(gs.item, 0.2, { css: {top: (window.innerHeight/2) - (gs.item.offsetHeight/2), left: (window.innerWidth/2) - (gs.item.offsetWidth/2)}, ease: Back.ease});
        }
    }
}

