;
var isLeftResizing = false,
    isRightResizing = false;

$(function () {
    var elementBlock = $('#elementBlock'),
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
    elementBlock.dragged = elementBlock.dragging = false;
    
    
     el ={};
    
    // blueBlock.click(function(){
    //   if(!blueBlock.dragged){
    //     blueBlock.dragged =true;
    //     blueBlock.appendTo('#toBePlaced');
    //   }
    // });
    
    //This is when user selects from the list
    function updateElementlist(e){
        el.top = e.clientY - $(e.target).offset().top;
        el.left = e.clientX - $(e.target).offset().left;
        el.width = $(e.target).width();
        el.height = $(e.target).height();
        return [el.top,el.left,el.width,el.height];
    }
    
    //This is when user selects from grid
    function updateElement(e){
        el.tmp.top = e.clientY - $(e.target.parentNode).offset().top;
        el.tmp.left = e.clientX - $(e.target.parentNode).offset().left;
        el.tmp.width = $(e.target.parentNode).width();
        el.tmp.height = $(e.target.parentNode).height();
    }
    

    
    
    
elementBlock.on('mousedown',function(e){
       // var el = e.target.nodeName;
       // var elt = e.target.getAttribute('id');
        
     updateElementlist(e);
         
        
     elementBlock.dragging = true;
    
     //element is let go
     if(!elementBlock.dragged){
             $(e.target).appendTo(document.body);
            $(e.target).css({
              'width' : el.width,
              'height': el.height,
              'margin-left' : e.clientX - el.left,
              'margin-top' :e.clientY - el.top
            });
      }
      else{
        if(elementBlock.tmp.parentCreated){
          elementBlock.tmp.cursorLeft = e.clientX - (canvasLeft + Number.parseInt(greenRow.css('margin-left')) + Number.parseInt(blueWrapper.css('margin-left')) + Number.parseInt(elementBlock.css('margin-left')) );
          elementBlock.tmp.cursorTop = e.clientY - (Number.parseInt($('#toBePlaced').css('margin-top')) + Number.parseInt(greenRow.css('margin-top')) )
        }
        else{
          elementBlock.tmp.cursorLeft = e.clientX - (canvasLeft + Number.parseInt(elementBlock.css('margin-left')) );
          elementBlock.tmp.cursorTop = e.clientY - (Number.parseInt($('#toBePlaced').css('margin-top')) + Number.parseInt(elementBlock.css('margin-top')) )
        }
      }
    });
    handleLeft.change(function(){
      blueWrapper.css({
        'margin-left': redBarWidth * Math.floor(Number.parseInt(elementBlock.css('margin-left'))/redBarWidth),
        'width' : blueWrapper.tmp.rightCoordinates  - ( canvasLeft + redBarWidth * Math.floor(Number.parseInt(elementBlock.css('margin-left'))/redBarWidth))
      });
      elementBlock.css({
        'margin-left': Number.parseInt(elementBlock.css('margin-left')) - Number.parseInt(blueWrapper.css('margin-left')),
        'width': elementBlock.tmp.width
      });
    });
    handleRight.change(function(){
      blueWrapper.css({
        'width' : redBarWidth * Math.ceil((Number.parseInt(elementBlock.css('margin-left')) + elementBlock.width())/redBarWidth)
      });
    });
    var elementBlockRight;
    handleLeft.on('mousedown',function(){
      if(!elementBlock.tmp.parentCreated && elementBlock.dragged){
        $(document).trigger('createParents');
      }
      isLeftResizing = true;
      elementBlockRight = canvasLeft + elementBlock.offset().left + elementBlock.width();
    });
    handleRight.on('mousedown',function(){
      if(!elementBlock.tmp.parentCreated){
        $(document).trigger('createParents');
      }
      isRightResizing = true;
      elementBlock.tmp.leftCoordinates  = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(elementBlock.css('margin-left'));
    });
    $(document).on('mousemove',function(e){
      if(elementBlock.dragging && !elementBlock.dragged){
        elementBlock.css({
          'margin-left': e.clientX - elementBlock.tmp.left,
          'margin-top': e.clientY - elementBlock.tmp.top
        })
      }
      if(elementBlock.dragging && elementBlock.dragged && !isLeftResizing && !isRightResizing){
        if(elementBlock.tmp.parentCreated){
          greenRow.css({
            'margin-top': e.clientY - elementBlock.tmp.cursorTop
          });
          if(e.clientX - elementBlock.tmp.cursorLeft>= canvasLeft && e.clientX - elementBlock.tmp.cursorLeft + elementBlock.width() < canvasLeft +canvasWidth ){
            elementBlock.css({
              'margin-left':e.clientX - (canvasLeft + elementBlock.tmp.cursorLeft)
            });
            handleLeft.change();
            handleRight.change();
          }
        }
        else{
          elementBlock.css({
            'margin-top': e.clientY - elementBlock.tmp.cursorTop
          });
        }
      }
      if(isLeftResizing){
        if(!!blueWrapper && canvasLeft <= e.clientX && e.clientX <= elementBlock.tmp.rightCoordinates ){
          elementBlock.css({
            'margin-left': e.clientX - canvasLeft,
            'width': elementBlock.tmp.rightCoordinates  - e.clientX
          });
          elementBlock.tmp.width = elementBlock.width();
          handleLeft.change();
        }
      }
      if(isRightResizing){
        if(!!blueWrapper && elementBlock.tmp.leftCoordinates  <=e.clientX && e.clientX <= canvasLeft + canvasWidth){
          elementBlock.css({
            'width': e.clientX - elementBlock.tmp.leftCoordinates
          });
          handleRight.change();
        }
      }
    }).on('mouseup',function(e){
      if(elementBlock.dragging && !elementBlock.dragged){
        if(canvas.offset().left<=e.clientX && e.clientX<=canvas.offset().left+ canvas.width() && canvas.offset().top <= e.clientY && e.clientY <= canvas.offset().top + canvas.height()){
          elementBlock.appendTo('#toBePlaced');
          elementBlock.dragged = true;
          elementBlock.dragging = false;
          elementBlock.css({
            'margin-left': 0,
            'margin-top': Number.parseInt(elementBlock.css('margin-top')) - canvas.offset().top,
            'width':canvas.width()
          });
        }
      }
      if(elementBlock.dragging && elementBlock.dragged){
        elementBlock.dragging = false;
      }
      if(isLeftResizing){
        isLeftResizing = false;
        blueWrapper.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left'));
        elementBlock.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(elementBlock.css('margin-left'));
      }
      if(isRightResizing){
        isRightResizing = false;
        blueWrapper.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) + blueWrapper.width();
        elementBlock.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(elementBlock.css('margin-left')) + elementBlock.width();
      }
    });

    $(document).on('createParents',function(){
      elementBlock.wrap('<div id="greenRow"></div>');
      elementBlock.wrap('<div id="blueWrapper"></div>');
      blueWrapper = $('#blueWrapper');
      greenRow = $('#greenRow');
      greenRow.css({
        'margin-left': 0,
        'margin-top': Number.parseInt(elementBlock.css('margin-top')) - canvas.offset().top,
        'width':elementBlock.width(),
        'height':elementBlock.height(),
        'background':'green',
        // 'opacity':0.2,
        'z-index':1
      });
      blueWrapper.css({
        'margin-left':0,
        'margin-top':0,
        'width':elementBlock.width(),
        'height':elementBlock.height(),
        'background':'yellow',
        // 'opacity':0.5,
        'z-index':2
      });
      elementBlock.css({
        'margin-left':0,
        'margin-top':0,
        'top':0,
        'left':0,
        'bottom':0
      })
      blueWrapper.tmp = {};
      elementBlock.tmp.parentCreated =true;
      blueWrapper.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left'));
      blueWrapper.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) + blueWrapper.width();
      elementBlock.tmp.leftCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(elementBlock.css('margin-left'));
      elementBlock.tmp.rightCoordinates = canvasLeft + Number.parseInt(blueWrapper.css('margin-left')) +Number.parseInt(elementBlock.css('margin-left')) + elementBlock.width();
    });
});
