'use strict';



awp.controller('awpGridCtrl', function($scope){


    // Function to resize div correctly when screen resized.
    
    // original array of values (vals),
    // the index of the fixed value (fixedIndex), 
    // and the new sum (newSum); and returns a new array with suitably modified values:
    // an array of fixed indices (fixedIndices)
    
   $scope.newwidths = function (vals, fixedIndices, newSum) {
                          var initSum = vals.reduce(function (prev, cur) {return prev + cur;}, 0);
                          var fixedSum = fixedIndices.reduce(function (prev, cur, index) {return prev + vals[cur];}, 0);
                          var initRemainingSum = initSum - fixedSum;
                          var endRemainingSum = newSum - fixedSum;
                          return vals.map(function(cur, index) {return fixedIndices.indexOf(index) === -1 ? endRemainingSum*(cur/initRemainingSum) : cur;})
                        }
        
   var test = $scope.newwidths([100, 225, 500], [1,2], 400);
   console.log(test);

    
    
});