'use strict';
var awp = angular.module('awp', []);

awp.controller('awpCtrl', function($scope){

console.log('sss');

$scope.typography = true;
$scope.settings= true;
$scope.addSections= true;
$scope.addExtra= true;

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
          $scope.typographyBtnStyleOptions = false;
          $scope.typographyBtnResize = !$scope.typographyBtnResize;

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
    
    
      $scope.menu[selectedMenu] = !$scope.menu[selectedMenu];
      console.log($scope.menu[selectedMenu]);
};


});
