'use strict';


awp.controller('awpGridCtrl', function($scope, editor){
    
$scope.mouseUpEvent = function () {

    $scope.returnSelection = $scope.getSelectedMarkdownNodes()

    editor.actualRange = $scope.returnSelection[0] // correct range
    editor.selectedContent = $scope.returnSelection[1] // user selected range
    editor.selectedParentNodes = $scope.returnSelection[2] // selected Content Hthml Nodes
    editor.selectionAncestor = $scope.returnSelection[3] // parent wrapper


 } 
    

// alows me to set the rang start and end   
$scope.getBodyTextOffset = function(sel, node, offset) {

    var range = document.createRange();
    range.selectNodeContents(document.getElementById('markdown-body'));
    range.setEnd(node, offset);
    sel.removeAllRanges();
    sel.addRange(range);
    return sel.toString().length;
}
  
// Get selection
  $scope.getSelectionOffsets =  function(sel) {
     var range, off,  start = 0, end = 0;
       if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            start = $scope.getBodyTextOffset(sel, range.startContainer, range.startOffset);
            end = $scope.getBodyTextOffset(sel, range.endContainer, range.endOffset);
            sel.removeAllRanges();
            sel.addRange(range);
            alert(start + ", " + end);
            
            var off = sel.anchorOffset;
           // range.deleteContents();
         }
         else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            var off = document.selection.anchorOffset;
           //  range.deleteContents();
        }
        return {
                range: range,
		        start: start,
		        end: end
		    };
  }
    
    
    $scope.getSelectedMarkdownNodes = function() {
      // from https://developer.mozilla.org/en-US/docs/Web/API/Selection
        
      var sel, tags,
      sel = window.getSelection();
      
        
      if (sel == undefined || sel.isCollabsed || sel.toString() == '') {return [];};
     
       // Let's get the correct range starting points]
        $scope.actualRange = $scope.getSelectionOffsets(sel);
      
    
    // Let me know the start of the Anchor node and End of the Anchor Node.
      var startAnchorNode = $scope.markdown_node_location(sel.anchorNode); //  - Returns the Node in which the selection begins.
      
      var endfocusNode = $scope.markdown_node_location(sel.focusNode); // - Returns the Node in which the selection ends.
 
        


    /*
    This will only be Valid if there is HTML tags in between.
    */
      if (startAnchorNode.inside && endfocusNode.inside) {
        //console.log('option one');
         // var selectionAncestor = $scope.get_common_ancestor(location1.node, location2.node);
          // check for common parents.
        $scope.selectionAncestor = $scope.commonAncestor(startAnchorNode.node, endfocusNode.node); // This works!
          
          
          
        // console.log('should give me parrents',$scope.selectionAncestor);
         // console.log(startAnchorNode.node ,endfocusNode.node );
        //  console.log('found', selectionAncestor);
        // Need to pass to the service the parent with the salected content and user selection  
          
    
        // If there are no HTML tags than run the selection
        if ($scope.selectionAncestor == null) { 
            return []; // no tags found in selection
        }
        
        // Inside the common parent we check what HTML are to not break the HTML 
        $scope.nodesInsideAncestro = $scope.getNodesBetween($scope.selectionAncestor, startAnchorNode.node, endfocusNode.node);
       
        // Returing user selected and nearest pare with HTML tags
        return  [ 
            $scope.actualRange, 
            $scope.selectedContent ,
            $scope.nodesInsideAncestro, 
            $scope.selectionAncestor
        ]; 
          
          
      } else if ((startAnchorNode.before && endfocusNode.after) || (endfocusNode.before && startAnchorNode.after)) {
          
        console.log('statement two')
          
        return $scope.toArray(markdownbody().childNodes);
          
      } else if (startAnchorNode.outside && endfocusNode.outside) {
           console.log('location 1 outside', startAnchorNode.outside);
           console.log('location2.outside', endfocusNode.outside);
           console.log('statement 3')
        return [];
          
      } else if (startAnchorNode.before) {
           console.log('statement 4')
        return $scope.getSelectedMarkdownNodesBefore(endfocusNode.node);
          
      } else if (location2.before) {
          console.log('statement 5')
        return $scope.getSelectedMarkdownNodesBefore(startAnchorNode.node);
          
      } else if (startAnchorNode.after) {
           console.log('statement 6')
        return $scope.getSelectedMarkdownNodesAfter(endfocusNode.node);
          
          
      } else if (endfocusNode.after) {
            console.log('statement 7')
        return $scope.getSelectedMarkdownNodesAfter(startAnchorNode.node);
          
      }
    }
    // get location
    $scope.markdown_node_location = function(node) {
      return new $scope.Markdown_node_location(node);
        
    }

    $scope.Markdown_node_location = function(node) {
      this.before = $scope.node_is_before_markdown_body(node);
      this.inside = $scope.node_is_in_markdown_body(node);
      this.after = !(this.before || this.inside);
      this.outside = !this.inside;
      this.node = node;
       // console.log(this.node)
    }
    
    var NO_RETURN_VALUE = function(){}; 
    NO_RETURN_VALUE = NO_RETURN_VALUE();
    
    $scope.node_is_before_markdown_body = function(node_before) {
      var start = $scope.markdownbody();
      var result = $scope.walk_the_DOM_while(document.body, function(node){
          if (node == start) {
            return false;
          };
          if (node == node_before) {
            return true;
          };
        });
      if (result == NO_RETURN_VALUE) {
        return false;
      };
      return result;
    }
    
    $scope.node_is_in_markdown_body = function(node_inside) {
      return $scope.isDescendant($scope.markdownbody(), node_inside);
    }
    
    
   $scope.walk_the_DOM_while = function(node, func) {
        // walks the dom while the function returns nothing
        // from http://stackoverflow.com/questions/6248833/using-jquery-to-walk-dom-return-html-attributes-from-node
        var result = func(node);
        if (result != NO_RETURN_VALUE) {
            return result;
        };
        node = node.firstChild;
        while (node) {
            result = $scope.walk_the_DOM_while(node, func);
            if (result != NO_RETURN_VALUE) {
                return result;
            };
            node = node.nextSibling;
        }
    };
    
    $scope.isDescendant =  function(parent, child) {
      //  console.log('isDescendat loop');
         // from http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
         // node is decendant from itself. this is important for getNodesBetween
         var node = child;
         //console.log(node);
         while (node != null) {
             if (node == parent) {
                 return true;
             }
             node = node.parentNode;
             //console.log('parent node is', node.parentNode );
         }
         return false;
    }
    
    
    // if there is none around it will fetch the html parent container.
    $scope.markdownbody = function() {
         //var markdownbody = document.getElementById('markdown-body')[0]
        //console.log(document.getElementById('markdown-body'));
        
        //.getAttribute('data-element') 
        
        
        return document.getElementById('markdown-body');
        
    }
     
    
    
 $scope.parents = function(node) {
      // Place the first node into an array
  var nodes = [node];
      // Place the first node into an array
  for (; node; node = node.parentNode) {
       // Place that node at the beginning of the array
        // This unravels the tree into an array with child/parents only
    nodes.unshift(node)
  }
      // Return the array
  return nodes
}
// Clean up nodes
$scope.removeTextNode = function(nodes){
    return [].filter.call(nodes, function(o){
        return o.nodeType == Node.ELEMENT_NODE;
    });
}
    
$scope.commonAncestor = function(node1, node2) {
  
  var parents1 = $scope.parents(node1);
  var parents2 = $scope.parents(node2);
    
    var onlyHTMLparent1 = $scope.removeTextNode(parents1);
    var onlyHTMLparent2 = $scope.removeTextNode(parents2);
    
    var reverseParents1 = onlyHTMLparent1.reverse();
    var reverseParents2 = onlyHTMLparent2.reverse();
    
    var found = null;
    reverseParents1.forEach(function(item, i) {
               var thisa = item; 
              
                reverseParents2.forEach(function(el, b) {
                  //  console.log('a el', typeof thisa)
                 //     console.log('b el', typeof el)

                    if (thisa == el ){
                         if (found == null) {
                              found = el;
                             // console.warn('hurrary', found);
                              return found;
                        }else{
                           
                        }
                        //found = el;

                       //return found;
                        // return found;
                    }
                });

                if (found) {
                    return false;
                }
                
    });
    return found;
    
    
/*
  if (reverseParents1[0] != reverseParents2[0]) {
      console.log("No common ancestor!")
  }
  
 var found = null;
  for (var i = 0; i < reverseParents1.length; i++) {
    if (reverseParents1[i] != reverseParents2[i]) {
        console.log('this is it', reverseParents1[i - 1]);
        return reverseParents1[i - 1]
    }else{
       found = reverseParents1[i];
       var mainParnet = $scope.markdownbody();
        console.log(typeof found.tagName );
          console.log(typeof '<b>' );
        
    
        if(found == mainParnet){
           return found; // should only return if there is no tag closet.
        }else if(found.tagName == 'B'){
              return found;
            console.log('tags is parent'); // Tag is parent than return tag.
        }else{
            console.log('upps');
        }
        
    }
  }
  */
   
}
    
    
    
     /*
    // Get closet tags
    $scope.get_common_ancestor = function(a, b) {
        console.warn('get common ancestor');
        
            // from http://stackoverflow.com/questions/3960843/how-to-find-the-nearest-common-ancestors-of-two-or-more-nodes
           var parentsa = $scope.getParents(a);
           var parentsb = $scope.getParents(b);
        
         // console.log('parents a' ,parentsa);
         //  console.log('parents b' ,parentsb);
          
            //$parentsa = $(a).parents(); //old Jquery code
            //$parentsb = $(b).parents(); //old jquery code

            var found = null;
             
            parentsa.forEach(function(item, i) {
                var thisa = item; 
               console.log(thisa);
                parentsb.forEach(function(el, b) {
                  //  console.log('a el', typeof thisa)
                 //     console.log('b el', typeof el)
                   
                    if (thisa == el ){
                       
                        found = el;
                       console.warn('hurrary');
                        return found;
                        // return found;
                    }
                });

                if (found) {
                    return false;
                }
                 return found;
            });
            
           
        
           
            $parentsa.each(function() {
                var thisa = this;

                $parentsb.each(function() {
                    if (thisa == this)
                    {
                        found = this;
                        return false;
                    }
                });

                if (found) return false;
            });
          

           
        }
               */
               
       /*        
    // Custom JS for Javascript to find parent
     $scope.getParents = function(el, 
     parentSelector // optional ) {

            // If no parentSelector defined will bubble up all the way to *document*
            if (parentSelector === undefined) {
                parentSelector = document;
            }

            var parents = [];
            var p = el.parentNode;

            while (p !== parentSelector) {
                var o = p;
                parents.push(o);
                p = o.parentNode;
            }
            parents.push(parentSelector); // Push that parentSelector you wanted to stop at

            return parents;
        }
    */
    
    // get all HTML between the selection
    $scope.getNodesBetween = function(rootNode, node1, node2) {
          var resultNodes = [];
          var isBetweenNodes = false;
        
          for (var i = 0; i < rootNode.childNodes.length; i+= 1) {
           // console.warn($scope.isDescendant(rootNode.childNodes[i], node1));
              
            if ($scope.isDescendant(rootNode.childNodes[i], node1) || $scope.isDescendant(rootNode.childNodes[i], node2)) {
                  if (resultNodes.length == 0) {
                    isBetweenNodes = true;
                  } else {
                    isBetweenNodes = false;
                  }
                  resultNodes.push(rootNode.childNodes[i]);

              } else if (resultNodes.length == 0) {
            
              } else if (isBetweenNodes) {
              
                  resultNodes.push(rootNode.childNodes[i]);
            
              } else {
              
                  return resultNodes;
            }
          };
          if (resultNodes.length == 0) {
            return [rootNode];
              
          } else if ($scope.isDescendant(resultNodes[resultNodes.length - 1], node1) || $scope.isDescendant(resultNodes[resultNodes.length - 1], node2)) {
            return resultNodes;
          } else {
            //return resultNodes;
            // same child node for both should never happen
            return [resultNodes[0]];
          }
        }
    
      $scope.toArray =  function(obj) {
          // from http://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
          var array = [];
          // iterate backwards ensuring that length is an UInt32
          for (var i = obj.length >>> 0; i--;) { 
            array[i] = obj[i];
          }
          return array;
        }
      // checking if it starts with a closing tag
      $scope.getSelectedMarkdownNodesBefore = function(node) {
          var nodes = [];
          var parent = markdownbody().firstChild;
          while (parent) {
            nodes.push(parent);
            if ($scope.isDescendant(parent, node)) { 
              return nodes;
            };
            parent = parent.nextSibling;
          }
          return [];
        }
      // checking if it end with a opening tag
      $scope.getSelectedMarkdownNodesAfter =  function(node) {
          var nodes = [];
          var parent = markdownbody().lastChild;
          while (parent) {
            nodes.push(parent);
            if ($scope.isDescendant(parent, node)) { 
              return nodes;
            };
            parent = parent.previousSibling;
          }
          return [];
        }
   /* 
   // Get the Clean selected content
    $scope.getSelectionText = function(){
        var sel, range;
        if (typeof window.getSelection != "undefined") {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                var off = sel.anchorOffset;
                
                //range.setStart($(".content").get(0), 0);
                //var tags = range.cloneContents().childNodes[1].innerHTML;
                
                 //ran.setStart($(".content").get(0), 0);
                //range.deleteContents();
                //range.insertNode(document.createTextNode(userSelectedText));
                //range.insertNode(document.createElement(userSelectedText));

            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            var off = document.selection.anchorOffset;
             var tags = range.cloneContents().childNodes[1].innerHTML;
             // console.log('second', range);
            //range.text = replacementText;
        }
        //console.log(tags);
        return range;
        
    }  
    */
   
    
  
    

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