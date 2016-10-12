$(function(){

    $('.navItem').click(function(event){
        var $el = $(event.target);
        var side = $el.data('side');

        $('#box').removeClass();
        $('#box').addClass('show-' + side);
    });

  var svg = {

    initialize : function(){

        var SVG_URL = 'http://www.w3.org/2000/svg';
        var svgCanvas = document.createElementNS(SVG_URL, "svg");
        svgCanvas.setAttribute('id', 'svgCanvas');
        svgCanvas.setAttribute('width', '100%');
        svgCanvas.setAttribute('height', '100%');

        svgCanvas.style.position = 'absolute';
        svgCanvas.style.top = '0px';

        $('body').prepend(svgCanvas);

        this.addFilter();
        this.svgCanvas = svgCanvas;
        this.circles = [];
        noLasers = true;
        toggleStroke = true;
        toggleStrokeCircle = true;

    },

    addLine : function(x1,y1,x2,y2){

        var SVG_URL = 'http://www.w3.org/2000/svg';
        var line = document.createElementNS(SVG_URL, "line");
        line.setAttribute("x1",x1);
        line.setAttribute("y1",y1);
        line.setAttribute("x2",x2);
        line.setAttribute("y2",y2);
        line.setAttribute("stroke-width",'6px');
        line.setAttribute("stroke",'red');
        line.setAttribute("filter","url(#glowSVG)");

        var lineBlue = document.createElementNS(SVG_URL, "line");
        lineBlue.setAttribute("x1",x1);
        lineBlue.setAttribute("y1",y1);
        lineBlue.setAttribute("x2",x2);
        lineBlue.setAttribute("y2",y2);
        lineBlue.setAttribute("stroke-width",'6px');
        lineBlue.setAttribute("stroke-linecap",'round');
        lineBlue.setAttribute("stroke",'orange');
        lineBlue.setAttribute("marker",'circle');

        this.svgCanvas.appendChild(lineBlue);
        this.svgCanvas.appendChild(line);

        return [line, lineBlue];
    },

    addCircle : function(cx,cy,r,w){

        var SVG_URL = 'http://www.w3.org/2000/svg';
        var circle = document.createElementNS(SVG_URL, "circle");
        circle.setAttribute("cx",cx);
        circle.setAttribute("cy",cy);
        circle.setAttribute("r",r);
        circle.setAttribute("stroke-width",w);
        circle.setAttribute("stroke",'gray');
        circle.style.fill='black';

        this.svgCanvas.appendChild(circle);
        this.circles.push(circle);

        return circle;

    },

    //doesn't work in Safari
    addFilter : function(){

        var SVG_URL = 'http://www.w3.org/2000/svg';

        var defs = document.createElementNS(SVG_URL, "defs");

        var filter = document.createElementNS(SVG_URL, "filter");
        filter.setAttribute('id','glowSVG');
        filter.setAttribute('x','0');
        filter.setAttribute('y','0');
        filter.setAttribute('width','200%');
        filter.setAttribute('height','200%');

        var offset = document.createElementNS(SVG_URL, "feOffset");
        // offset.setAttribute('dx','15');
        // offset.setAttribute('dy','15');

        var gaussianFilter = document.createElementNS(SVG_URL, "feGaussianBlur");
        gaussianFilter.setAttribute("in","SourceGraphic");
        gaussianFilter.setAttribute("stdDeviation","2");

        filter.appendChild(gaussianFilter);
        filter.appendChild(offset);
        defs.appendChild(filter);

        svgCanvas.appendChild(defs);

    },

    removeLines : function(){

      svgCanvas.removeChild(lines1[0]);
      svgCanvas.removeChild(lines1[1]);
      svgCanvas.removeChild(lines2[0]);
      svgCanvas.removeChild(lines2[1]);

    },

    changeLineOrigin : function(x1,y1,x2,y2){

      lines1[0].setAttribute("x1",x1);
      lines1[0].setAttribute("y1",y1);

      lines1[1].setAttribute("x1",x1);
      lines1[1].setAttribute("y1",y1);

      lines2[0].setAttribute("x1",x2);
      lines2[0].setAttribute("y1",y2);

      lines2[1].setAttribute("x1",x2);
      lines2[1].setAttribute("y1",y2);

    },

    changeLineDestination : function(x1,y1){

      lines1[0].setAttribute("x2",x1);
      lines1[0].setAttribute("y2",y1);

      lines1[1].setAttribute("x2",x1);
      lines1[1].setAttribute("y2",y1);

      lines2[0].setAttribute("x2",x1);
      lines2[0].setAttribute("y2",y1);

      lines2[1].setAttribute("x2",x1);
      lines2[1].setAttribute("y2",y1);

    },

    wiggleStroke : function(){

        if(toggleStroke){
          lines1[0].setAttribute("stroke-dasharray", "10,2,3");
          lines2[0].setAttribute("stroke-dasharray", "10,2,3");
        }
        else{
          lines1[0].setAttribute("stroke-dasharray", "7,4,10");
          lines2[0].setAttribute("stroke-dasharray", "7,4,10");
        }

        toggleStroke = !toggleStroke;

    },

      wiggleStrokeCircles : function(){

          if (toggleStrokeCircle){
              for (var i = 0; i < svg.circles.length; i++){
                  svg.circles[i].setAttribute("stroke-dasharray", "1,2,1");
              }
          }
          else{
              for (var i = 0; i < svg.circles.length; i++){
                  svg.circles[i].setAttribute("stroke-dasharray", "4,3,2");
              }
          }

          toggleStrokeCircle = !toggleStrokeCircle;

      }

  }; //end SVG object


  $('html').on('mousemove',function(event){

    var width = $('body').width();
    var height = $('body').height();

    // var headX = width/2;
    // var headY = head.height/2;

    var headX = $('#head').offset().left + head.width/2;
    var headY = $('#head').offset().top + head.height;

    clickX = event.pageX;
    clickY = event.pageY;

    var absX = clickX - headX;
    var absY = headY - clickY;

    var phi = 90 * absX/width;
    var theta = 90/2 * absY/height;

    head.rotate(theta, phi);


    if (window.lines1 != undefined){
      var eyeCoords = head.getEyeCoordinates();
      
      var left1 = eyeCoords[0];
      var top1 = eyeCoords[1];
      var left2 = eyeCoords[2];
      var top2 = eyeCoords[3];

      svg.changeLineOrigin(left1,top1,left2,top2);

      origTheta = theta;
      origPhi = phi;

      svg.changeLineDestination(clickX,clickY);

    }

  })


  $('html').on('mousedown',function(event){

    if (event.which == 1) {// left click

        if (!noLasers){

          var eyeCoords = head.getEyeCoordinates();

          var left1 = eyeCoords[0];
          var top1 = eyeCoords[1];
          var left2 = eyeCoords[2];
          var top2 = eyeCoords[3];

          clickX = event.pageX;
          clickY = event.pageY;

          lines1 = svg.addLine(left1, top1, clickX, clickY);
          lines2 = svg.addLine(left2, top2, clickX, clickY);

          origTheta = parseInt($('#cube').css('rotateX'));
          origPhi = parseInt($('#cube').css('rotateY'));

          shakeHead = setInterval(function(){

            if (!noLasers){

              var theta = parameters.shakeHead_strength*(Math.random() -.5);
              var phi = parameters.shakeHead_strength*(Math.random() -.5);

              head.rotate(origTheta+theta,origPhi+phi);

              var eyeCoords = head.getEyeCoordinates();

              var left1 = eyeCoords[0];
              var top1 = eyeCoords[1];
              var left2 = eyeCoords[2];
              var top2 = eyeCoords[3];

              svg.changeLineOrigin(left1,top1,left2,top2);

              svg.wiggleStroke();

            }
            else {
              clearInterval(shakeHead);
              svg.removeLines();
            }

          }, 10);


            var animate_circles = function(circles,handle){

                if (circles.length){
                    for (var i = 0; i < circles.length; i++){
                        var circle = circles[i];

                        var old_cx = parseInt(circle.getAttribute('cx'));
                        var old_cy = parseInt(circle.getAttribute('cy'));
                        var old_r = parseInt(circle.getAttribute('r'));

                        var new_cx = old_cx + 30*(Math.random() - .5);
                        var new_cy = old_cy - 20*(Math.random());
                        var new_r = .9*old_r;

                        if (new_cy < 0 || new_r < 0.1){
                            circle.parentNode.removeChild(circle);
                            var index = circles.indexOf(circle);
                            circles.splice(index,1);
                        }
                        else {
                            circle.setAttribute('cx', new_cx);
                            circle.setAttribute('cy', new_cy);
                            circle.setAttribute('r', new_r);
                        }
                    }
                    svg.wiggleStrokeCircles();
                }
                else{
                    clearInterval(handle);
                }

            }



           startBurnAnimation = setInterval(function(){
               if (!noLasers){
                    var circles = [
                        svg.addCircle(clickX,clickY,4,2),
                        svg.addCircle(clickX,clickY,6,4),
                        svg.addCircle(clickX,clickY,4,6),
                        svg.addCircle(clickX,clickY,2,2),
                        svg.addCircle(clickX,clickY,8,4),
                        svg.addCircle(clickX,clickY,7,5)
                    ];

                   var animateBurn = setInterval(function(){animate_circles(circles,animateBurn)}, 50);
               }

            },400)

        }
    }
    
  });

  $('html').on('mouseup',function(event){

    clearInterval(shakeHead);
    clearInterval(startBurnAnimation);
    head.rotate(origTheta,origPhi);

    if (!noLasers)
      svg.removeLines();

  });

  head.initialize();
  svg.initialize();

});

