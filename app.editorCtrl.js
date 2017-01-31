awp.controller('awpCtrl', function($scope, editor ){
    

$scope.typography = true; $scope.settings= true;
$scope.addSections= true;$scope.addExtra= true;
$scope.addLink= true;$scope.addSections = true;

// Temporal menu show
$scope.graphicSettings = true;$scope.graphicVideo = true;$scope.bgColorOptions = true;

$scope.menu = {};
$scope.switchMenu = function(selectedMenu) {

$scope.selectItem = selectedMenu;
            //if typography is flase than enable
            if(selectedMenu == 'typography'){


                 $scope.isNotVisible = true;$scope.settings= false;
                 $scope.addSections= false;$scope.addExtra= false;

                  //Enable submenu
                  $scope.typographyOptions = !$scope.typographyOptions;
                  $scope.typographyBold = !$scope.typographyBold;
                  $scope.typographyItalic = !$scope.typographyItalic;
                  $scope.typographyHeadingOptions = !$scope.typographyHeadingOptions;
                  $scope.typographyLink = !$scope.typographyLink;
                  $scope.typographyUppercase = !$scope.typographyUppercase;
                  $scope.typographyColorOptions = !$scope.typographyColorOptions;
                  $scope.typographyColorHex = false;
                  $scope.typographyBtnStyleOptions = !$scope.typographyBtnStyleOptions;
                  $scope.typographyFonts = !$scope.typographyFonts;
                  $scope.typographyHeading  = false;
                  $scope.typographyLinkURL = !$scope.typographyHeading;
                  $scope.typographyBtnStyleOptions = true;
                  $scope.typographyBtnResize = true;
                //$scope.typographyBtnResize = !$scope.typographyBtnResize;

                  //Content or Options
                  $scope.set_typography = !$scope.set_typography;

            }
            // if typographyColorOptions is false than enable
            if(selectedMenu == 'typographyColorOptions'){
                  $scope.typographyOptions = true;
                  $scope.typographyBold = false
                  $scope.typographyItalic = false;
                  $scope.typographyHeadingOptions = false;
                  $scope.typographyLink = false;
                  $scope.typographyUppercase = false;
                  $scope.typographyColorOptions = true;
                  $scope.typographyColorHex = true;
                  $scope.typographyBtnStyleOptions = false;
                  $scope.typographyFonts = false;
                  $scope.typographyHeading  = false;
                  $scope.typographyLinkURL = false;
                  $scope.typographyBtnStyleOptions = false;
                  $scope.typographyBtnResize = false;
                  $scope.typographyFonts = false;

                  //Content or Options
                  $scope.set_typography = false;
                  $scope.set_typographyFonts = false;
                  $scope.set_typographyColorHex = true;
                  $scope.set_typographyLink = false;

            }
            if(selectedMenu == 'typographyHeadingOptions'){
                $scope.typographyFonts = false;
                $scope.typographyBold = false;
                $scope.typographyItalic = false;
                $scope.typographyHeading = true;
                $scope.typographyLink = false;
                $scope.typographyLinkURL = false;
                $scope.typographyUppercase = false;
                $scope.typographyColorOptions = false;
                $scope.typographyFonts = false;


                 //Content or Options
                  $scope.set_typography = false;
                  $scope.set_typographyFonts = false;
                  $scope.set_typographyColorHex = false;
                  $scope.set_typographyLink = false;

            }
            if(selectedMenu == 'typographyLink'){
              $scope.typographyBold = false;
              $scope.typographyHeadingOptions = false;
              $scope.typographyHeading = false;
              $scope.typographyColorHex = false;
              $scope.typographyItalic = false;
              $scope.typographyLink = true;
              $scope.typographyLinkURL = true;
              $scope.typographyUppercase = false;
              $scope.typographyColorOptions = false;
              $scope.typographyFonts = false;

              //Content or Options
              $scope.set_typography = false;
              $scope.set_typographyFonts = false;
              $scope.set_typographyColorHex = false;
              $scope.set_typographyLink = true;


            }
            if(selectedMenu == 'typographyFonts'){

                  $scope.typographyBold = true;
                  $scope.typographyHeadingOptions = true;
                  $scope.typographyHeading = false;
                  $scope.typographyColorHex = false;
                  $scope.typographyItalic = true;
                  $scope.typographyLink = true;
                  $scope.typographyLinkURL = true;
                  $scope.typographyUppercase = true;
                  $scope.typographyColorOptions = true;
                  $scope.typographyFonts = true;

                 //Content or Options
                  $scope.set_typography = false;
                  $scope.set_typographyFonts = true;
                  $scope.set_typographyColorHex = false;
                  $scope.set_typographyLink = false;

             }
            if (selectedMenu == 'graphicSettings'){
                //Main Options
                $scope.typography = false;
                $scope.settings= false;
                $scope.addSections= false;
                $scope.addExtra= false;
                $scope.bgColorOptions = false;


                $scope.graphicOptions = true;
                $scope.graphicOptionsImage = true;
                $scope.graphicOptionsVideo = true;

                //Content or Options
                $scope.set_graphicImage = true;

            }
            if (selectedMenu == 'graphicOptionsImage'){
                $scope.graphicImage = true;
                $scope.graphicVideo = true;
                $scope.addLink = true;
                $scope.bgColorOptions = false;


                //Content or Options
                $scope.set_graphicImage = true;
                $scope.set_graphicVideo = false;

            }
            if(selectedMenu == 'graphicOptionsVideo'){
                $scope.graphicImage = true;
                $scope.graphicVideo = true;
                $scope.addLink = true;
                $scope.bgColorOptions = false;

                //Content or Options
                $scope.set_graphicImage = false;
                $scope.set_graphicVideo = true;
            }
            if(selectedMenu == 'addLink'){
                $scope.addLink = true;
                $scope.addLinkURL = true;
                $scope.graphicSettings = false;
                $scope.bgColorOptions= false;
                $scope.typography = false;
                $scope.settings= false;
                $scope.addSections= false;
                $scope.addExtra= false;

            }
            if (selectedMenu == 'bgColorOptions'){
                $scope.bgColorOptions = true;
                $scope.bgColorHex = true;

                //Main menu
                $scope.settings= false;
                $scope.typography = false;
                $scope.addSections= false;
                $scope.graphicSettings = false;
                $scope.addExtra= false;


                //Content or Options
                $scope.set_bgColor = true;

            }
            if(selectedMenu == 'addSections'){

                //Content or Options
                $scope.set_sectionOption = true;
                $scope.set_addElement = false;
                $scope.set_bgColor = false;
            }
            if(selectedMenu =='addExtra'){

                //Content or Options
                $scope.set_addElement = true;
                $scope.set_sectionOption = false;
                $scope.set_bgColor = false;

            }
              $scope.menu[selectedMenu] = !$scope.menu[selectedMenu];
              console.log($scope.menu[selectedMenu]);
};


//onclick func that pass the selected tag to create HTML wrappers
$scope.textToHtml = function(htmlVarTag){
   
    
    if(htmlVarTag){
		
		console.log(editor.actualRange, editor.selectedContent,editor.selectionAncestor,editor.selectedParentNodes, htmlVarTag);
		
        // passing the content selected and it parents
          $scope.createElement(
              editor.actualRange,           // Setup the range object
              editor.selectedContent,       // selection
              editor.selectionAncestor,     // selection parents
              editor.selectedParentNodes,   // selection parent child nodes
              htmlVarTag                    // HTML tag
          );
        
          editor.selectedContent = '';
         
    }

}

$scope.isElement =  function(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrom)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have. (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}

/* Does not WORK
$scope.unwrap =  function (wrapper) {
    // place childNodes in document fragment
    var docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
        var child = wrapper.removeChild(wrapper.firstChild);
        docFrag.appendChild(child);
    }

    // replace wrapper with document fragment
    wrapper.parentNode.replaceChild(docFrag, wrapper);
}
*/


//Create the HTML wrapper around the selected content
$scope.createElement = function( 
              range,                        // Setup the range object
              selectedContentParents,       // selection
              selectionAncestor,            // selection common parents
              selectedParentNodes,          // selection parent child nodes
              htmlVarTag                    // HTML tag
){
    
    
    
    
    var actualRangeObj = range.range;
    var cloneinnerHTML = actualRangeObj.cloneContents();
	
	
   
    var newNode = document.createElement(htmlVarTag);
   
    // Check if the New created node doe not conflick with parents
     if(newNode.tagName == selectionAncestor.tagName){
             var ele = document.getElementById('markdown-body');
             var myText = selectionAncestor.innerHTML;
				console.log('my text', myText);
			 
				//console.log(typeof selectionAncestor);
         
             var selectionStart =    actualRangeObj.startOffset; // get selection start from parent
             var selectionEnd =    actualRangeObj.endOffset; // get selection end from parent
          
             var start = range.start; // start count depending on main container.
             var end = range.end; // End count depending on main container.
         
               // var newText = myText.substring(0, start) + '<b> whast up' + myText.substring(start, end) + '</span>' + myText.substring(end);
             selectionAncestor.removeChild[0];
			 

	
			 console.log(selectionStart,selectionEnd); 2/16
			 console.log(start,end); 249 / 263
			 var textEnd = selectionAncestor.length;
             var newText = myText.substring(0, selectionStart) + '<b>' + myText.substring(selectionStart, selectionEnd) + '</b>' + myText.substring(selectionEnd,textEnd);
			 
    var str = document.getElementById("markdown-body").innerHTML;
	var selectionAncestor = selectionAncestor.outerHTML;
	
	//var selectionAncestor = 'Phasellus egestas' 
	//var newText = 'Test';
	var res = str.replace(selectionAncestor, newText);
	console.log(res);
	document.getElementById("markdown-body").innerHTML = res;
         alert(newText);
         //removeContainers(selectionAncestor);
         
         //selectionAncestor.removeChild;
         //var newNode = document.createElement("span");
         
  // http://stackoverflow.com/questions/3352871/using-javascript-insertbefore-to-insert-before-a-textnode
  // This is where I am stuck, I am able to create the next Node above in newText, and remove the old node but can't insert it.
         // I can insert an span, that is on line 301 but not text 
         
        // ele.insertBefore(newNode, selectionAncestor)
         //ele.insertBefore(newText, selectionAncestor)
         
        // I can remove the kids but not the tagname 
      
         

         
         // range.start.insertNode(newText); 
           //ele.innerHTML = newText;
         
         function removeContainers(selectionAncestor){
            var j=0, len = selectionAncestor.childNodes.length;
            for(i= 0;  i<len  ;i++){
                selectionAncestor.removeChild(selectionAncestor.childNodes[j]);

            }
        }

       
            alert('you are creating inside a  bold');
        }
    
    console.log('selectedparent',selectedContentParents);
     

}

 $scope.checkIfHTMLinside = function(selectedContentParents,selectedParentNodes, htmlVarTag){
     
     
     if(selectedContentParents.nodeName == htmlVarTag){
          //element.parentNode.replaceChild(element.firstChild, element);
        
         var cloneInside = selectedContentParents.innerHTML;
         selectedContentParents.replaceWith(cloneInside);

         return;
         
         console.warn(selectedContentParents.innerHTML);
        console.warn(selectedContentParents);
         console.warn(selectedContentParents.nodeName);
        
        
     }
     
      var node = selectedParentNodes;
      console.log('node that is selectedwrapper', selectedParentNodes)
      for (var i = 0; i < selectedParentNodes.length; i++) {
          console.log('tag name is ',selectedParentNodes[i].nodeName);
          var temptagname = selectedParentNodes[i].nodeName;
          if(selectedParentNodes[i].nodeName == htmlVarTag ){
              //console.log('contains element B');
              node.remove(htmlVarTag);
              //selectedContentWrap[i].removeChild(selectedContentWrap);
              console.log('clean node',node);
          }
          
      }
      

     
 }


// on keyup
    $scope.keyUpEvent = function () {
        console.log('use typing in');
        
    } 
})
;