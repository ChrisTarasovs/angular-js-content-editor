;
var isLeftResizing = false,
    isRightResizing = false;

$(function () {
    var blueBlock = $('#blueBlock'),
        handleLeft = $('#blue-left'),
        handleRight = $("#blue-right"),
        redBar = $("#test-bar"),
        canvas = $("#canvas"),
        blueWrapper,greenRow;

    // Constants
    var redBarHeight = redBar.height(),
        redBarWidth  = redBar.outerWidth(),
        canvasLeft   = canvas.offset().left,
        canvasWidth  = canvas.width();

    // console.log(canvasLeft,canvasWidth,redBarWidth,redBarHeight);
    blueBlock.dragged = blueBlock.dragging = false;
    blueBlock.tmp={};
    // blueBlock.click(function(){
    //   if(!blueBlock.dragged){
    //     blueBlock.dragged =true;
    //     blueBlock.appendTo('#toBePlaced');
    //   }
    // });
    blueBlock.on('mousedown',function(e){
      blueBlock.tmp.left = e.clientX - $('#blueBlock').offset().left;
      blueBlock.tmp.top = e.clientY - $('#blueBlock').offset().top;
      blueBlock.tmp.width = blueBlock.width();
      blueBlock.tmp.height = blueBlock.height();
      blueBlock.dragging = true;
      if(!blueBlock.dragged){
        blueBlock.appendTo(document.body);
        blueBlock.css({
          'width' : blueBlock.tmp.width,
          'height': blueBlock.tmp.height,
          'margin-left' : e.clientX - blueBlock.tmp.left,
          'margin-top' :e.clientY - blueBlock.tmp.top
        });
      }
      else{
        if(blueBlock.tmp.parentCreated){
          blueBlock.tmp.cursorLeft = e.clientX - (canvasLeft + Number.parseInt(greenRow.css('margin-left')) + Number.parseInt(blueWrapper.css('margin-left')) + Number.parseInt(blueBlock.css('margin-left')) );
          blueBlock.tmp.cursorTop = e.clientY - (Number.parseInt($('#toBePlaced').css('margin-top')) + Number.parseInt(greenRow.css('margin-top')) )
        }
        else{
          blueBlock.tmp.cursorLeft = e.clientX - (canvasLeft + Number.parseInt(blueBlock.css('margin-left')) );
          blueBlock.tmp.cursorTop = e.clientY - (Number.parseInt($('#toBePlaced').css('margin-top')) + Number.parseInt(blueBlock.css('margin-top')) )
        }
      }
    });
    handleLeft.change(function(){
      blueWrapper.css({
        'margin-left': redBarWidth * Math.floor(Number.parseInt(blueBlock.css('margin-left'))/redBarWidth),
        'width' : blueWrapper.tmp.rightCoordinates  - ( canvasLeft + redBarWidth * Math.floor(Number.parseInt(blueBlock.css('margin-left'))/redBarWidth))
      });
      blueBlock.css({
        'margin-left': Number.parseInt(blueBlock.css('margin-left')) - Number.parseInt(blueWrapper.css('margin-left')),
        'width': blueBlock.tmp.width
      });
    });
    handleRight.change(function(){
      blueWrapper.css({
        'width' : redBarWidth * Math.ceil((Number.parseInt(blueBlock.css('margin-left')) + blueBlock.width())/redBarWidth)
      });
    });
    var blueBlockRight;
    handleLeft.on('mousedown',function(){
      if(!blueBlock.tmp.parentCreated && blueBlock.dragged){
        $(document).trigger('createParents');
      }
      isLeftResizing = true;
      blueBlockRight = canvasLeft + blueBlock.offset().left + blueBlock.width();
    });
    handleRight.on('mousedown',function(){
      if(!blueBlock.tmp.parentCreated){
        $(document).trigger('createParents');
      }
      isRightResizing = true;
      blueBlock.tmp.leftCoordinates  = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(blueBlock.css('margin-left'));
    });
    $(document).on('mousemove',function(e){
      if(blueBlock.dragging && !blueBlock.dragged){
        blueBlock.css({
          'margin-left': e.clientX - blueBlock.tmp.left,
          'margin-top': e.clientY - blueBlock.tmp.top
        })
      }
      if(blueBlock.dragging && blueBlock.dragged && !isLeftResizing && !isRightResizing){
        if(blueBlock.tmp.parentCreated){
          greenRow.css({
            'margin-top': e.clientY - blueBlock.tmp.cursorTop
          });
          if(e.clientX - blueBlock.tmp.cursorLeft>= canvasLeft && e.clientX - blueBlock.tmp.cursorLeft + blueBlock.width() < canvasLeft +canvasWidth ){
            blueBlock.css({
              'margin-left':e.clientX - (canvasLeft + blueBlock.tmp.cursorLeft)
            });
            handleLeft.change();
            handleRight.change();
          }
        }
        else{
          blueBlock.css({
            'margin-top': e.clientY - blueBlock.tmp.cursorTop
          });
        }
      }
      if(isLeftResizing){
        if(!!blueWrapper && canvasLeft <= e.clientX && e.clientX <= blueBlock.tmp.rightCoordinates ){
          blueBlock.css({
            'margin-left': e.clientX - canvasLeft,
            'width': blueBlock.tmp.rightCoordinates  - e.clientX
          });
          blueBlock.tmp.width = blueBlock.width();
          handleLeft.change();
        }
      }
      if(isRightResizing){
        if(!!blueWrapper && blueBlock.tmp.leftCoordinates  <=e.clientX && e.clientX <= canvasLeft + canvasWidth){
          blueBlock.css({
            'width': e.clientX - blueBlock.tmp.leftCoordinates
          });
          handleRight.change();
        }
      }
    }).on('mouseup',function(e){
      if(blueBlock.dragging && !blueBlock.dragged){
        if(canvas.offset().left<=e.clientX && e.clientX<=canvas.offset().left+ canvas.width() && canvas.offset().top <= e.clientY && e.clientY <= canvas.offset().top + canvas.height()){
          blueBlock.appendTo('#toBePlaced');
          blueBlock.dragged = true;
          blueBlock.dragging = false;
          blueBlock.css({
            'margin-left': 0,
            'margin-top': Number.parseInt(blueBlock.css('margin-top')) - canvas.offset().top,
            'width':canvas.width()
          });
        }
      }
      if(blueBlock.dragging && blueBlock.dragged){
        blueBlock.dragging = false;
      }
      if(isLeftResizing){
        isLeftResizing = false;
        blueWrapper.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left'));
        blueBlock.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(blueBlock.css('margin-left'));
      }
      if(isRightResizing){
        isRightResizing = false;
        blueWrapper.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) + blueWrapper.width();
        blueBlock.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(blueBlock.css('margin-left')) + blueBlock.width();
      }
    });

    $(document).on('createParents',function(){
      blueBlock.wrap('<div id="greenRow"></div>');
      blueBlock.wrap('<div id="blueWrapper"></div>');
      blueWrapper = $('#blueWrapper');
      greenRow = $('#greenRow');
      greenRow.css({
        'margin-left': 0,
        'margin-top': Number.parseInt(blueBlock.css('margin-top')) - canvas.offset().top,
        'width':blueBlock.width(),
        'height':blueBlock.height(),
        'background':'green',
        // 'opacity':0.2,
        'z-index':1
      });
      blueWrapper.css({
        'margin-left':0,
        'margin-top':0,
        'width':blueBlock.width(),
        'height':blueBlock.height(),
        'background':'yellow',
        // 'opacity':0.5,
        'z-index':2
      });
      blueBlock.css({
        'margin-left':0,
        'margin-top':0,
        'top':0,
        'left':0,
        'bottom':0
      })
      blueWrapper.tmp = {};
      blueBlock.tmp.parentCreated =true;
      blueWrapper.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left'));
      blueWrapper.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) + blueWrapper.width();
      blueBlock.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(blueBlock.css('margin-left'));
      blueBlock.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(blueBlock.css('margin-left')) + blueBlock.width();
    });
});
