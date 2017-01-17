'use strict';
var awp = angular.module('awp', []);



awp.controller('awpCtrl', function($scope){
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

/*
//Get Selected Content
$scope.mouseUpEvent = function() {
    
    $scope.selectedText =  $scope.getSelectionText();
   
    console.log('sdasd');
};  
*/
//User click bold
$scope.userClickedBold = function(){
    // $scope.currentlySelected = $scope.getSelectionText();
    return $scope.getSelectionText()
}
    
$scope.mouseUpEvent = function () {
    var createBold = 'b';
    $scope.getSelectionText(createBold);
  
   /*
     if (window.getSelection) {
         sel = window.getSelection().createElement("b");
         sel.innerHTML = "Bold text";
         return sel;
         
     } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
     */
    
    
}

$scope.getSelectionText = function(htmlVarTag){
    var createTagVar = htmlVarTag;
    var sel, range;
    if (typeof window.getSelection != "undefined") {
        sel = window.getSelection();
        if (sel.rangeCount) {
           var range = sel.getRangeAt(0),
            content = range.cloneContents(),
            createTag = document.createElement(createTagVar);
            createTag.appendChild(content);
            
            var htmlContent = createTag.innerHTML;
            range.insertNode(createTag);
            
            //range.deleteContents();
            //range.insertNode(document.createTextNode(userSelectedText));
            //range.insertNode(document.createElement(userSelectedText));
            
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
    
}

/*
//Get selection range    
$scope.getSelectionText = function(){
  var userSelectedText = "";
  if (window.getSelection) {
      
      
      
    
      $scope.currentlySelect = window.getSelection().toString();
      userSelectedText = 'Hello' + $scope.currentlySelect;
      console.log();
     
     // userSelectedText = window.getSelection().toString();
      
    //  $scope.myselectText = window.getSelection().toString();
      
    //  console.log($scope.myselectText);
     
      console.log('firs');
  } else if (document.selection && document.selection.type != "Control") {
      userSelectedText = document.selection.createRange().text;
      console.log('second');
  }
    

  return userSelectedText;
}  
*/


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

