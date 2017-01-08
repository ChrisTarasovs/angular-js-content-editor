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
  console.log($scope.selectItem);


  $scope.typographyOptions = false;
  $scope.typographyFonts = false;
  $scope.typographyBold = false;
  $scope.typographyColorOptions = false;
  $scope.typographyItalic = false;
  $scope.typographyHeadingOptions = false;
  $scope.typographyHeading  = false;
  $scope.typographyLink = false;
  $scope.typographyLinkURL = false;
  $scope.typographyUppercaseLowecase = false;




    //if typography is flase than enable
    if(selectedMenu == 'typography'){
      console.log('typography is enabled');





      //Enable submenu
      $scope.typographyOptions = true;
      $scope.typographyFonts = true;
      $scope.typographyBold = true;
      $scope.typographyColorOptions = true;
      $scope.typographyItalic = true;
      $scope.typographyHeadingOptions = true;
      $scope.typographyHeading  = false;
      $scope.typographyLink = true;
      $scope.typographyLinkURL = false;
      $scope.typographyUppercaseLowecase = true;
      $scope.typographyBtnStyleOptions = true;
      $scope.typographyBtnResize = true;

      //Content or Options
      $scope.set_typography = true;

    }

    // if typographyColorOptions is false than enable
    if(selectedMenu == 'typographyColorOptions'){
        console.log('typographyColorOptions  is enabled');
        $scope.typographyFonts = false;
        $scope.typographyBold = false;
        $scope.typographyHeadingOptions = false;
        $scope.typographyHeading = false;
        $scope.typographyColorHex = true;
        $scope.typographyItalic = false;
        $scope.typographyLink = false;
        $scope.typographyLinkURL = false;
        $scope.typographyUppercaseLowecase = false;



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
        $scope.typographyUppercaseLowecase = false;
        $scope.typographyColorOptions = false;
    }
    if(selectedMenu == 'typographyLink'){
      $scope.typographyFonts = false;
      $scope.typographyBold = false;
      $scope.typographyHeadingOptions = false;
      $scope.typographyHeading = false;
      $scope.typographyColorHex = false;
      $scope.typographyItalic = false;
      $scope.typographyLink = true;
      $scope.typographyLinkURL = true;
      $scope.typographyUppercaseLowecase = false;
      $scope.typographyColorOptions = false;

      //Content or Options
      $scope.set_typography = false;
      $scope.set_typographyFonts = false;
      $scope.set_typographyColorHex = false;
      $scope.set_typographyLink = true;


    }
      $scope.menu[selectedMenu] = !$scope.menu[selectedMenu];
      console.log($scope.menu[selectedMenu]);
};


//Predefine menu and it variabels

// Main Menu
  //ng-show="typography"
  //typography = true;
  //ng-show="settings"
  //ng-show="addSections"
  //ng-show="addExtra"

// Second Level
  // typography submenu
    //ng-show="typographySubmenu"
    //typographySubmenu  = true;
    //ng-show="typographyBold"
    //ng-show="typographyHeadingOptions"
    //ng-show="typographyHeadingOptions"
    //ng-show="typographyLink"
    //ng-show="typographyLinkURL"

    //ng-show="typographyUppercaseLowecase"
    //ng-show="typographyColorOptions"
    //ng-show="typographyColorHex"
    //ng-show="typographyBtnStyleOptions"
    //ng-show="typographyBtns"
    //ng-show="typographyBtnResize"


});
