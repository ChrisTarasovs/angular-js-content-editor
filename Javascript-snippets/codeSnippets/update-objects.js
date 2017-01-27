/*
Temporal code that is created to understand how to get object , use results to
filter and than to map back the fields in the array.
*/

var myObject = [{
  dimensions: [451, 255],
  margins: [0, 2, 0, 29]
}, {
  dimensions: [222, 390],
  margins: [0, 5, 0, 37]
}, {
  dimensions: [333, 390],
  margins: [0, 8, 0, 37]
}];


var results = myObject.reduce(function(acc, item) {
  acc.dimensions.push(item.dimensions[0]);
  acc.margins.push(item.margins[1], item.margins[3]);
  return acc;

}, { dimensions: [], margins: [] });

console.log(results); // {dimensions: Array[3], margins: Array[6]}

var dimensions = results.dimensions;
var margins = results.margins;

/** Update myObject */
dimensions = ['a','b','c'];
margins = ['a','b','c', 'd', 'e', 'f'];

var updateMyObject = function() {
  myObject.forEach(function(item, i) {
    item.dimensions[0] = dimensions[i];
    item.margins[1] = margins[i + i];
    item.margins[3] = margins[i + i + 1];
  })
}
updateMyObject()
console.log('After update: ', myObject);