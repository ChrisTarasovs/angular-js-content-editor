awp.controller('awpCtrl', function($scope, editor ){
    

$scope.typography = true;
$scope.settings= true;
$scope.addSections= true;
$scope.addExtra= true;
$scope.addLink= true;
$scope.addSections = true;

// Temporal menu show
$scope.graphicSettings = true;
$scope.graphicVideo = true;
$scope.bgColorOptions = true;

$scope.menu = {};
$scope.switchMenu = function(selectedMenu) {


$scope.selectItem = selectedMenu;
            //if typography is flase than enable
            if(selectedMenu == 'typography'){


                 $scope.isNotVisible = true;
                 $scope.settings= false;
                 $scope.addSections= false;
                 $scope.addExtra= false;

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
    
    console.log('this is what in range', editor.selectedContent ); // user selected range
    console.log('select item parent nodes', editor.selectedParentNodes ); // not needed
      console.log('this is parents ',  editor.selectionAncestor );// parent wrapper
    
    
    if(htmlVarTag){
        // passing the content selected and it parents
          $scope.createElement(editor.selectedContent,editor.selectionAncestor, editor.selectedParentNodes, htmlVarTag);
        
          editor.selectedContent = '';
         // console.warn(editor.selectedContent);
    }
    // $scope.currentlySelected = $scope.getSelectionText();
    //return $scope.getSelectionText()  
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

//Create the HTML wrapper around the selected content
$scope.createElement = function( range, selectedContentParents,selectedParentNodes,  htmlVarTag ){
    
    
   
       var selectedContent = range.cloneContents();
       var newNode = document.createElement(htmlVarTag);
       newNode.appendChild(selectedContent);
       var htmlContent = newNode.innerHTML;
       range.deleteContents()
       range.insertNode(newNode);
    
    /*
    console.log('what the range', range);
    console.log('what the range', selectedContentParents);
    console.log('newNode' ,newNode );
    console.log('selectedContentParents' ,selectedContentParents );
    */
    if( newNode.tagName ==  selectedContentParents.tagName){
        
        console.log(typeof newNode );
        
        console.log(typeof selectedContentParents );

    }
    
    
     //  var orginalNode = $scope.checkIfHTMLinside(selectedContentParents,selectedParentNodes, htmlVarTag );
    // need to check if parent and child are not wrapped in the same thing. 
    // for B, i,link, 
    
    

}

 $scope.checkIfHTMLinside = function(selectedContentParents,selectedParentNodes, htmlVarTag){
     
     /* shit does not work
        var nodeOrgin = selectedContentParents.firstChild;
        var child = selectedContentParents.firstChild;
       console.log('child', child);
        while (child) {
          selectedContentParents.parentElement.insertBefore(child, selectedContentParents);
              console.log('child', child);
          child = child.nextSibling;
        }
    
        selectedContentParents.parentElement.removeChild(selectedContentParents);
       console.log('orginal node',nodeOrgin);
     return nodeOrgin;
     */
     /*
       for (item of selectedContentWrap) {
           console.log('itme index of',item.innerHtml.indexOf(htmlVarTag));
        if (item.innerHtml.indexOf(htmlVarTag)) {
            console.log('true buddy');
          return true;
        }
      }
      return false;
   */
     
     
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


//Updated an existing html element
$scope.updateElement = function(){
    
}



// on keyup
    $scope.keyUpEvent = function () {
        console.log('use typing in');
        
    } 
})
/*
.directive("contenteditable", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: linkFunc
    }

    //Update the editable view
    function linkFunc($scope, element, attributes, ngModelController){
         console.log('dasdasds');
      
        element.on("keyup blur change", function () {
              scope.$apply(updateViewModel)
         })

        $scope.keyUpEvent = function () {
              scope.$apply(updateViewModel)
         }
        
        
        function updateViewModel() {
          var htmlValue = element.text()
          ngModelController.$setViewValue(htmlValue)
        }

        ngModelController.$render = updateHtml

        function updateHtml(){
            var viewModelValue = ngModelController.$viewValue
            element.text(viewModelValue)
        }

    }    
})
*/
;