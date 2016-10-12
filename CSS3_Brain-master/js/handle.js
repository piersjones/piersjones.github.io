$(function(){

  $('#handle').click(function(){

  });

  $('#handle').draggable({

    containment: "#slider",

    start: function() {

      noLasers = true;
      prevIndex = head.slices;

    },

    drag: function(a,event) {
      
      var position = 280 - event.position.left;
      var slices = head.slices;

      index = Math.floor(position/280 * slices);

      direction = prevIndex - index;

      var canvasEl = $('canvas');

      if (direction >= 0){
        while (index < prevIndex){
          canvasEl.eq(prevIndex).css({'display' : 'none'});
          prevIndex--;
            console.log(prevIndex)
        }
      }
      else {
         while (index > prevIndex){
          canvasEl.eq(prevIndex).css({'display' : 'block'});
          prevIndex++;
          console.log(prevIndex)
        }
      }

      prevIndex = index;

    },

    stop: function() {

      if (index > 30)
        noLasers = true;
      else
        noLasers = true;
    }

  });

})  