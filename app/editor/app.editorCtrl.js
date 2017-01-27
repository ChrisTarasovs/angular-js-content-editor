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
$scope.textToHtml = function(tag){
    if(tag){
          $scope.createElement(editor.selectedContent,tag);
          editor.selectedContent = '';
    }
    // $scope.currentlySelected = $scope.getSelectionText();
    //return $scope.getSelectionText()  
}
//Create the HTML wrapper around the selected content
$scope.createElement = function(range,htmlVarTag ){
    var createTagVar = htmlVarTag;

    var selectedContent = range.cloneContents(),
    createTag = document.createElement(createTagVar);
    createTag.appendChild(selectedContent);

    var htmlContent = createTag.innerHTML;
    range.insertNode(createTag);

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