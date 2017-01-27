'use strict';


awp.controller('awpGridCtrl', function($scope, editor){
    
    
    //User click bold
    $scope.userClickedBold = function(){
        // $scope.currentlySelected = $scope.getSelectionText();
        //return $scope.getSelectionText()
    }
   
    $scope.mouseUpEvent = function () {
      
        editor.selectedContent = $scope.getSelectionText();
        
        //$scope.getSelectionText(createBold);
       // editor.getSelectionText();

       // var htmlVarTag = 'b';
       // var createEl = $scope.createElement(range,htmlVarTag);

        //editor.selectionRange = $scope.getSelectionText(createBold);
     } 
    
    
    
    $scope.getSelectionText = function(){

        var sel, range;
        if (typeof window.getSelection != "undefined") {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                //console.log('first', range);
                //range.deleteContents();
                //range.insertNode(document.createTextNode(userSelectedText));
                //range.insertNode(document.createElement(userSelectedText));

            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
             // console.log('second', range);
            //range.text = replacementText;
        }
        
        return range;
        
    }  
    
    
  
    

    /*
   $scope.newwidths = function (vals, fixedIndices, newSum) {
                          var initSum = vals.reduce(function (prev, cur) {return prev + cur;}, 0);
                          var fixedSum = fixedIndices.reduce(function (prev, cur, index) {return prev + vals[cur];}, 0);
                          var initRemainingSum = initSum - fixedSum;
                          var endRemainingSum = newSum - fixedSum;
                          return vals.map(function(cur, index) {return fixedIndices.indexOf(index) === -1 ? endRemainingSum*(cur/initRemainingSum) : cur;})
                        }
        
   var test = $scope.newwidths([100, 225, 500], [1,2], 400);
   console.log(test);
   */
    
    
    
    
});