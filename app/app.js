'use strict';


var awp = angular.module('awp', []);


awp.controller('awpCtrl', function($scope){
//  $scope.message = 'asda';
console.log('sss');

$scope.typography = true;

$scope.menu = {};
$scope.switchMenu = function(selectedMenu) {


$scope.selectItem = selectedMenu;
  console.log($scope.selectItem);


    //if typography is flase than enable
    if(selectedMenu == 'typography'){
      console.log('typography is enabled');
      //Enable submenu
      $scope.typographySubmenu = true;
      $scope.typographyBold = true;
      $scope.typographyColorOptions = true;
      $scope.typographyItalic = true;
      //$scope.typographyBtnStyleOptions = true;
      //$scope.typographyColorOptions
        //  $scope.typographyColorHex
    }
    // if typographyColorOptions is false than enable
    if(selectedMenu == 'typographyColorOptions'){
        console.log('typographyColorOptions  is enabled');

        $scope.typographyColorHex = true;
        $scope.typographyItalic = false;
        $scope.typographyBold = false;
        $scope.typographyUppercaseLowecase = false;


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
    //ng-show="typographyUppercaseLowecase"
    //ng-show="typographyColorOptions"
    //ng-show="typographyColorHex"
    //ng-show="typographyBtnStyleOptions"
    //ng-show="typographyBtns"
    //ng-show="typographyBtnResize"

// should pass the click variable of the menu
  $scope.activeMenu = function (menuvar){
    // log the vairable
    $scope.variable = menuvar;
    console.log($scope.variable);

    return $scope.menuvar  = true;

    //$scope.menuVariable = activelist;

    // console the vairable


  // Get the variable name

  // Set the variable submenu active if there is

  //Set the setting active if there is



    //$scope.activelist = true;
  }

});
