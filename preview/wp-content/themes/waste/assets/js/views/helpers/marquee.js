gs.marquee = function () {
    var parent =  document.querySelector('.marquee');
    var child = document.querySelector('.marquee-child');
    var speed = 30;

    if(parent) {
        $(parent).width( ($(child).outerWidth()*2)+60 );
        $(child).clone().appendTo(parent);

        var animation = function(el, speed) {
            TweenMax.to( el, speed, {
                x: -($(child).width()+20), 
                ease: Linear.easeNone,
                repeat: -1
            })
        };

        animation(parent, speed);
    }
}