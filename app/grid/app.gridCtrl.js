'use strict';


awp.controller('awpGridCtrl', function($scope, editor){
    
    
    //User click bold
    $scope.userClickedBold = function(){
        // $scope.currentlySelected = $scope.getSelectionText();
        //return $scope.getSelectionText()
    }
   
    $scope.mouseUpEvent = function () {
       
       // editor.selectedContent = $scope.getSelectionText();
       //  editor.selectedContent = $scope.getSelectedMarkdownNodes();
        
        // check if HTML are
       
        $scope.checkSelection = $scope.getSelectedMarkdownNodes()
        if ($scope.checkSelection = []){
            editor.selectedContent = $scope.getSelectionText();
        }
        
        
        console.log(editor.selectedContent);
     } 
    
    
    
    $scope.getSelectedMarkdownNodes = function() {
      // from https://developer.mozilla.org/en-US/docs/Web/API/Selection
      var selection = window.getSelection();
      if (selection == undefined || selection.isCollabsed || selection.toString() == '') {
        return [];
      };
         
      var location1 = $scope.markdown_node_location(selection.anchorNode); //  - Returns the Node in which the selection begins.
     // console.log('location one', location1);

      var location2 = $scope.markdown_node_location(selection.focusNode); // - Returns the Node in which the selection ends.
     // console.log('location two', location2);
        


    /*
    This will only be Valid if there is HTML tags in between.
    */
      if (location1.inside && location2.inside) {
          console.log('gone inside');
           console.log('location 1', location1.node);
           console.log('location 2', location2.node);
          
         // var selectionAncestor = $scope.get_common_ancestor(location1.node, location2.node);
         var selectionAncestor = $scope.commonAncestor(location1.node, location2.node); // This works!
          
        // Need to pass to the service the parent with the salected content and user selection  
          
    
        // If there are no HTML tags than run the selection
        if (selectionAncestor == null) { 
            return []; // no tags found in selection
        }
        console.log('run that far?');
        return  $scope.getNodesBetween(selectionAncestor, location1.node, location2.node);
          
      } else if ((location1.before && location2.after) || (location2.before && location1.after)) {
          
          console.log('statement two')
          
        return $scope.toArray(markdownbody().childNodes);
          
      } else if (location1.outside && location2.outside) {
           console.log('location 1 outside', location1.outside);
           console.log('location2.outside', location2.outside);
           console.log('statement 3')
        return [];
          
      } else if (location1.before) {
           console.log('statement 4')
        return $scope.getSelectedMarkdownNodesBefore(location2.node);
          
      } else if (location2.before) {
          console.log('statement 5')
        return $scope.getSelectedMarkdownNodesBefore(location1.node);
          
      } else if (location1.after) {
           console.log('statement 6')
        return $scope.getSelectedMarkdownNodesAfter(location2.node);
          
          
      } else if (location2.after) {
            console.log('statement 7')
        return $scope.getSelectedMarkdownNodesAfter(location1.node);
          
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
    console.log(node1);
  var parents1 = $scope.parents(node1);
  var parents2 = $scope.parents(node2);
    
    var onlyHTMLparent1 = $scope.removeTextNode(parents1);
    var onlyHTMLparent2 = $scope.removeTextNode(parents2);
    
    var reverseParents1 = onlyHTMLparent1.reverse();
    var reverseParents2 = onlyHTMLparent2.reverse();

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
        console.log('Now lets understand what inside');
          var resultNodes = [];
          var isBetweenNodes = false;
        
          for (var i = 0; i < rootNode.childNodes.length; i+= 1) {
            
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
        console.log(tags);
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