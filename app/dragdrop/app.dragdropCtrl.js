awp.controller('sidebarCtrl', function ($scope) {
            $scope.centerAnchor = true;
            $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
            
            //List the type of object i got
            $scope.draggableObjects = [
                {name:'one'}, {name:'two'}, {name:'three'}
            ]; 
     //define object to drop in as arrays
            $scope.droppedObjects1 = [];
     //define object to drop in as arrays
            $scope.droppedObjects2= [];
     
     //what is this?
            $scope.onDropComplete1=function(data,evt){
                var index = $scope.droppedObjects1.indexOf(data);
                console.log(index);
                if (index == -1)
                $scope.droppedObjects1.push(data);
            }
            
            $scope.onDragSuccess1=function(data,evt){
                console.log("133","$scope","onDragSuccess1", "", evt);
                var index = $scope.droppedObjects1.indexOf(data);
                if (index > -1) {
                    $scope.droppedObjects1.splice(index, 1);
                }
            }
            
            
            $scope.onDragSuccess2=function(data,evt){
                var index = $scope.droppedObjects2.indexOf(data);
                if (index > -1) {
                    $scope.droppedObjects2.splice(index, 1);
                }
            }
            $scope.onDropComplete2=function(data,evt){
                var index = $scope.droppedObjects2.indexOf(data);
                if (index == -1) {
                    $scope.droppedObjects2.push(data);
                }
            }
            var inArray = function(array, obj) {
                var index = array.indexOf(obj);
                console.log(index);
            }
  });