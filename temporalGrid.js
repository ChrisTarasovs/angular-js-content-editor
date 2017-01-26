	
window.addEventListener('load', function () {
	    window.gridWidthOld = document.getElementById("bgGridTemporal").offsetWidth;
	 resizeGrid( gridWidthOld );
}, false);
	
/*
window.addEventListener('resize', function(){ 
   console.clear();
   resizeGrid();
});
*/
//var resizedBrowser = document.getElementById("bgGridTemporal").offsetWidth;
//resizeGrid(resizedBrowser);


var gridWidthOld;
var doit;
function resizedw(){
    console.clear();
      var gridWidthNew = document.getElementById("bgGridTemporal").offsetWidth;		
      resizeGrid(window.gridWidthOld, gridWidthNew);
}

window.onresize = function() {
    clearTimeout(doit);
    doit = setTimeout(function() {
        resizedw();
    }, 500);
};

   
	
	
                        
                     

// **** Helper Func **** //

// Clean up nodes
function removeTextNode(nodes){
    return [].filter.call(nodes, function(o){
        return o.nodeType == Node.ELEMENT_NODE;
    });
}
// Remove undiefied vars from array
function cleanUpArray(data){
  data = data.filter(function( element ) {
       return element !== undefined;
  });
  return data;
}
// Map Old wrapper array to new array
function mapWrapperFields(wrappers, wrappersUpdate){
    
    wrappers.forEach(function(item, i) {
                item.dimensions[0] = wrappersUpdate[0][i];
               item.margins[1] = wrappersUpdate[1][i + i]; // right
               item.margins[3] = wrappersUpdate[1][i + i + 1]; // left margin
    })
    return wrappers;
}
    
// Get Object dimensions and set in seperate array dimension;margin;positon
function getObjectDimensions(wrapperID, wraper){

    var wrapperDymations, style, wrapW, wrapH, wrapMTop, wrapMRight, wrapMBottom, wrapMLeft;

    wrapperDymations =[];
    style = wraper.currentStyle || window.getComputedStyle(wraper);
    wrapW = wraper.offsetWidth;
    wrapH = wraper.offsetHeight;

    wrapMTop = parseInt(style.marginTop, 10);
    wrapMRight = parseInt(style.marginRight);
    wrapMBottom = parseInt(style.marginBottom);
    wrapMLeft = parseInt(style.marginLeft);
    
    wrapPos = wraper.getAttribute('data-position');
    if(wrapPos){
       wrapPos = wrapperID;
      wrapperDymations.push.apply(wrapperDymations, [{dimensions: [wrapW,wrapH], margins: [wrapMTop,wrapMRight,wrapMBottom,wrapMLeft], positions: [parseInt(wrapPos)]}])
    }else{
      wrapperDymations.push.apply(wrapperDymations, [{
          dimensions: [wrapW,wrapH], margins: [wrapMTop,wrapMRight,wrapMBottom,wrapMLeft],positions: [] }
            ])}

    return wrapperDymations;

}

// Update Object dimension    
function updateObjectDimensions(wrapperArray, wraper ,wrapperInt){
   console.log(wrapperInt);
   console.log(wrapperArray);
   console.log( wraper);

    console.log(wrapperArray[wrapperInt].margins[0]);
    console.log(wrapperArray[wrapperInt].margins[3]);
   var w = wraper.style;
   w.width = wrapperArray[wrapperInt].dimensions[0];
   w.height = wrapperArray[wrapperInt].dimensions[1];
   w.marginRight  = wrapperArray[wrapperInt].margins[0];
   w.marginLeft  = wrapperArray[wrapperInt].margins[3];

}
// Seperate each rows Object in one dimension object, one margin object, one position object
function getObjectProperties(myObject){
   var properties =  myObject.reduce(function(newObj, item) 
                     {
                      newObj.dimensions.push(item.dimensions[0]);
                      newObj.margins.push(item.margins[1], item.margins[3]);

                      newObj.positions.push(item.positions[0]);
                      return newObj;
                    }, 
                    { dimensions: [], margins: [], positions: []  });
 return properties;
}

    
// Grid Resize 
function resizeGrid(gridWidthOld, gridWidthNew){
	if(gridWidthNew == undefined){
		gridWidthNew = gridWidthOld;
	}
		console.warn(gridWidthNew)
	console.warn(gridWidthOld)
    var container = document.getElementById('gridContainer');
    var row =  container.childNodes;
        row =  removeTextNode(row); // now is an array

    var rows = [];

    for (var a in row) {
         var wrapper = row[a].childNodes;
             wrapper = removeTextNode(wrapper); // now is an array
        
            var  rowrInt = [a];
            var rowdimensions = getObjectDimensions(rowrInt, row[a]);
            rows.push.apply(rows,rowdimensions );

            var wrapperArray = [];
            for (var b in wrapper) {
               var  wrapperInt = [b]; // wrapper integer
                wrapDymations = getObjectDimensions(wrapperInt, wrapper[b]);
                wrapperArray.push.apply(wrapperArray,wrapDymations );

            }
          wrappersArrays =  getObjectProperties(wrapperArray); // filter only widths and margins
          var objectfixedIndices = cleanUpArray(wrappersArrays.positions);   


        
        //Calculate widths
        var wrappersUpdate = calcWidths(
                                        //rowdimensions[0].dimensions[0], // row width
                                        gridWidthOld,
										wrappersArrays.dimensions,      // wrappers widths
                                        wrappersArrays.margins,         // wrappers margins
                                        objectfixedIndices,             // Fixed wrapper widths
                                        [],                             // Fixed margins
										gridWidthNew
                                        //resizedBrowser                  // New browser width reset
        )

        //Map the updated array with the old array
        mapWrapperFields(wrapperArray, wrappersUpdate);

        //updated the DOM wrappers in that row
        for (var b in wrapper) {
            var  wrapperInt = [b];
             updateObjectDimensions(wrapperArray, wrapper[b],wrapperInt);
        }
		 window.gridWidthOld = document.getElementById("bgGridTemporal").offsetWidth;
		 console.error(gridWidthOld);
    }
}


 
function calcWidths(
            rowWidth,             // The old sum of vals, valsTwo and remainder
            wrapperWidths,               // An array of widths
            wrapperMargins,            // An array of margins
            fixedIndexes,       // An array that referces to what element in Vals is fixed and can't change
            fixedMargin,    // An array that referces to what element in valsTwo is fixed and can't change
         
            resizedBrowser              // The new sum
            ) {   
/*
console.log(rowWidth,            
            wrapperWidths,              
            wrapperMargins,         
            fixedIndexes,      
            fixedMargin, 
            resizedBrowser             
)
*/				
                
var initMargins = wrapperMargins.reduce(function (prev, cur) {return prev + cur;}, 0);
var initWidths  = wrapperWidths.reduce(function (prev, cur) {return prev + cur;}, 0) ;
var remainder  = rowWidth - initWidths  - initMargins; // 
var initSum = wrapperWidths.reduce((a, b) => a + b, 0)  +  wrapperMargins.reduce((a, b) => a + b, 0) + remainder; 
		
    

// This func as I understand what elements in vals is fixed ?
var fixedSumWidth = fixedIndexes.reduce(function (prev, cur, index) {return prev + wrapperWidths[cur];}, 0); // 225

				// This func as I understand what elements in vals is fixed ?
var fixedSumMargin = fixedMargin.reduce(function (prev, cur, index) {return prev + wrapperMargins[cur];}, 0); // 225

				
//I need a func here to check if any elements in valstwo are fixed?
var initRemainingSum = initSum - fixedSumWidth - fixedSumMargin;
console.log('init reminaing sum', initRemainingSum);
				
var endRemainingSum = resizedBrowser - fixedSumWidth - fixedSumMargin;
console.log('End reminaing sum', endRemainingSum);
				
				
// This func goes through vals and updates the all the vals array value to the new propotions and stores it in valsUpdated
newWidths =  wrapperWidths.map(function(cur, index) {
			 return fixedIndexes.indexOf(index) === -1 ? endRemainingSum*(cur/initRemainingSum) : cur;
		
		})
        
				
// This func goes through valsTwo and updates the all the vals array value to the ne propotions and stores it in valsTwoUpdated         
newMargins =  wrapperMargins.map(function(cur, index) {
                         return fixedMargin.indexOf(index) === -1 ? endRemainingSum*(cur/initRemainingSum) : cur;
                     }) 
			
	
	  return [newWidths , newMargins ];
				
}    
