window.head = {

  initialize: function() {

    var that = this;

    this.$head = $('#head');
    this.$cube = $('#cube');

    //dimensions of head element
    this.width = 256;
    this.height = 256;
    this.depth = 180;

    //dimensions of image files
    this.resX = 256;
    this.resY = 256;
    this.slices = 120;

    //loading spinner from spin.js
    this.spinner = new Spinner(parameters.spinnerOpts).spin($('.perspective')[0]);
    this.spinner.el.style.zIndex = 2;


    //arrange slices from sprite in 3D space
    this.createSlices();

    //only show head when rendering is complete (load == 2)
    var load = 0;
    this.$head.hide();
    this.$head.css("visibility", "hidden");
    $('#slider').css("visibility", "hidden");

    this.image = new Image();
    this.image.onload = function () {
      if (++load == 2){
        that.drawSlices(); 
        that.spinner.stop();
        that.$head.fadeIn();
        that.$head.css("visibility", "visible");
        $('#slider').css("visibility", "visible");
        that.addEyeballs();
      }
    };

    this.mask = new Image();
    this.mask.onload = function () {
      if (++load == 2){
        that.drawSlices(); 
        that.spinner.stop();
        that.$head.fadeIn();
          that.$head.css("visibility", "visible");
          $('#slider').css("visibility", "visible");
          that.addEyeballs();
      }
    };

    this.image.src = parameters.head_image_src;
    this.mask.src = parameters.head_mask_src;

  },

  createSlices: function () {

    this.$head.empty();
    this.ctx = [];

    for (var i = 0; i < this.slices; ++i) {
      var z = -((i / this.slices) - .2) * this.depth,
          t = 'translateZ(' + z + 'px) translateX(0px)';

    var $canvas = $('<canvas>')
      .attr('width', this.resX)
      .attr('height', this.resY)
      .css({
        width: this.width,
        height: this.height,
        WebkitTransform: t,
        MozTransform: t,
        transform: t,
        opacity: parameters.head_opacity,
        position: 'absolute'
      });

      this.$head.prepend($canvas);
      this.ctx.push($canvas[0].getContext('2d'));

    }

    this.$slices = this.$head.find('canvas');

  },

  drawSlices: function () {

    var w = this.resX,
        h = this.resY,
        img = this.image,
        mask = this.mask,
        ctx = this.ctx;

    var alpha, color;

    this.$slices.each(function (i) {
      var c = ctx[i],
          ox = i * w, oy = 0;

      // Draw alpha channel and get pixels
      c.drawImage(mask, ox, oy, w, h, 0, 0, w, h);
      alpha = c.getImageData(0, 0, w, h);

      // Draw color channel and get pixels
      c.drawImage(img, ox, oy, w, h, 0, 0, w, h);
      color = c.getImageData(0, 0, w, h);

      // Copy red to alpha.
      var src = alpha.data, dst = color.data;
      for (var i = 0; i < src.length; i+=4){
        dst[i+3] = src[i];
      }

      // Draw RGBA.
      c.putImageData(color, 0, 0);

    });

  },

  addEyeballs : function(){
      var el1 = $('<div id="eye1">')
          .addClass('eye');

      var el2 = $('<div id="eye2">')
          .addClass('eye');

      this.$cube.prepend(el1, el2);
  },

  getEyeCoordinates : function(){

    var leftEye = $('#eye1');
    var rightEye = $('#eye2');

    var left1 = leftEye.offset().left;
    var top1 = leftEye.offset().top;

    var left2 = rightEye.offset().left;
    var top2 = rightEye.offset().top;

    return [left1, top1, left2, top2];

  },

  rotate : function(theta,phi){
    this.$cube.css({
      'rotateX' : theta + 'deg',
      'rotateY' : phi + 'deg'
    })
  },

  hideOne : function(index){
    $('canvas.x').eq(index).css({'display' : 'none'});
  },

  showOne : function(index){
    $('canvas').eq(index).css({'display' : 'block'});
  }

};