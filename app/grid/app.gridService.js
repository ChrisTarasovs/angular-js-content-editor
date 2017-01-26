awp.service('dataService', function($window){
  return function(){
    var x = 222,
    y = 333;

    return {
      a: x + y
    }
  }
});