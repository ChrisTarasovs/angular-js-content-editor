'use strict';


var awp = angular.module('awp', []);


awp.controller('awpCtrl', function($scope){
//  $scope.message = 'asda';
console.log('sss');


  $scope.activeMenu = function ($event){
    $scope.activelist = true;
  }

});
