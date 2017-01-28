'use strict';


awp.controller('awpGridCtrl', function($scope, editor){
    
    
    //User click bold
    $scope.userClickedBold = function(){
        // $scope.currentlySelected = $scope.getSelectionText();
        //return $scope.getSelectionText()
    }
   
    $scope.mouseUpEvent = function () {
       // editor.selectedContent = $scope.getSelectionText();
         editor.selectedContent = $scope.getSelectedMarkdownNodes();
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
        
    
      if (location1.inside && location2.inside) {
          console.log('gone inside');
           console.log('location 1', location1.node);
           console.log('location 2', location2.node);
          
          var selectionAncestor = $scope.get_common_ancestor(location1.node, location2.node);
        
          console.log('result of anchestor',selectionAncestor);
          
        if (selectionAncestor == null) { 
            return []; 
        }
          
          console.log(' run the shit below');
        return  $scope.getNodesBetween(selectionAncestor, location1.node, location2.node);
          
      } else if ((location1.before && location2.after) || (location2.before && location1.after)) {
          
          console.log('statement two')
          
        return $scope.toArray(markdownbody().childNodes);
          
      } else if (location1.outside && location2.outside) {
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
        return document.getElementById('markdown-body');
        
    }
     
     
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
               // console.log(thisa);
                parentsb.forEach(function(el, b) {
                  //  console.log('a el', typeof thisa)
                 //     console.log('b el', typeof el)
                   
                    if (thisa == el)
                    {
                       // console.warn('equal');
                        found = el;
                       
                        return false;
                    }
                });

                if (found) return false;
                
            });
            
        
            /*
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
            */

            return found;
        }
    // Custom JS for Javascript to find parent
     $scope.getParents = function(el, parentSelector /* optional */) {

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
    
    
    // get all HTML between the selection
    $scope.getNodesBetween = function(rootNode, node1, node2) {
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
    
    /*
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