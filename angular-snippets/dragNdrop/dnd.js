(function(dndLists) {
	
  var MIME_TYPE = 'application/x-dnd';
  var EDGE_MIME_TYPE = 'application/json';
  var MSIE_MIME_TYPE = 'Text';

  // All valid HTML5 drop effects, in the order in which we prefer to use them.
  var ALL_EFFECTS = ['move', 'copy', 'link'];
  
dndLists.directive('dndDraggable', ['$parse', '$timeout', function($parse, $timeout) {
    	return function(scope, element, attr) {
    		
    	 // Set the HTML5 draggable attribute on the element.
     	 element.attr("draggable", "true");
     	 
     	  if (attr.dndDisableIf) {
	        scope.$watch(attr.dndDisableIf, function(disabled) {
	          element.attr("draggable", !disabled);
	        });
	      }
     	 
     	   element.on('dragstart', function(event) {
		        event = event.originalEvent || event;
		
		        // Check whether the element is draggable, since dragstart might be triggered on a child.
		        if (element.attr('draggable') == 'false') return true;
		
		        // Initialize global state.
		        dndState.isDragging = true;
		        dndState.itemType = attr.dndType && scope.$eval(attr.dndType).toLowerCase();
		        
		        console.log(dndState.itemType);
		
		        // Set the allowed drop effects. See below for special IE handling.
		        dndState.dropEffect = "none";
		        dndState.effectAllowed = attr.dndEffectAllowed || ALL_EFFECTS[0];
		        event.dataTransfer.effectAllowed = dndState.effectAllowed;
		
		        // Internet Explorer and Microsoft Edge don't support custom mime types, see design doc:
		        // https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
		        var item = scope.$eval(attr.dndDraggable);
		        var mimeType = MIME_TYPE + (dndState.itemType ? ('-' + dndState.itemType) : '');
		        try {
		          event.dataTransfer.setData(mimeType, angular.toJson(item));
		        } catch (e) {
		          // Setting a custom MIME type did not work, we are probably in IE or Edge.
		          var data = angular.toJson({item: item, type: dndState.itemType});
		          try {
		            event.dataTransfer.setData(EDGE_MIME_TYPE, data);
		          } catch (e) {
		            // We are in Internet Explorer and can only use the Text MIME type. Also note that IE
		            // does not allow changing the cursor in the dragover event, therefore we have to choose
		            // the one we want to display now by setting effectAllowed.
		            var effectsAllowed = filterEffects(ALL_EFFECTS, dndState.effectAllowed);
		            event.dataTransfer.effectAllowed = effectsAllowed[0];
		            event.dataTransfer.setData(MSIE_MIME_TYPE, data);
		          }
		        }
		
		        // Add CSS classes. See documentation above.
		        element.addClass("dndDragging");
		        $timeout(function() { element.addClass("dndDraggingSource"); }, 0);
		
		        // Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
		        if (event._dndHandle && event.dataTransfer.setDragImage) {
		          event.dataTransfer.setDragImage(element[0], 0, 0);
		        }
		
		        // Invoke dragstart callback and prepare extra callback for dropzone.
		        $parse(attr.dndDragstart)(scope, {event: event});
		        if (attr.dndCallback) {
		          var callback = $parse(attr.dndCallback);
		          dndState.callback = function(params) { return callback(scope, params || {}); };
		        }
		
		        event.stopPropagation();
		      });
     	 
     	 
    	
    };
}]);
  
  
   dndLists.directive('dndList', ['$parse', function($parse) {
    return function(scope, element, attr) {
		      // While an element is dragged over the list, this placeholder element is inserted
		      // at the location where the element would be inserted after dropping.
		      var placeholder = getPlaceholderElement();
		      placeholder.remove();
		
		      var placeholderNode = placeholder[0];
		      var listNode = element[0];
		      var listSettings = {};
		  
		element.on('dragenter', function (event) {
	        event = event.originalEvent || event;
	
	        // Calculate list properties, so that we don't have to repeat this on every dragover event.
	        var types = attr.dndAllowedTypes && scope.$eval(attr.dndAllowedTypes);
	        listSettings = {
	          allowedTypes: angular.isArray(types) && types.join('|').toLowerCase().split('|'),
	          disabled: attr.dndDisableIf && scope.$eval(attr.dndDisableIf),
	          externalSources: attr.dndExternalSources && scope.$eval(attr.dndExternalSources),
	          horizontal: attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList)
	        };
	
	        var mimeType = getMimeType(event.dataTransfer.types);
	        if (!mimeType || !isDropAllowed(getItemType(mimeType))) return true;
	        event.preventDefault();
	     });
		  
		     /**
       * The dragover event is triggered "every few hundred milliseconds" while an element
       * is being dragged over our list, or over an child element.
       */
      element.on('dragover', function(event) {
        event = event.originalEvent || event;

        // Check whether the drop is allowed and determine mime type.
        var mimeType = getMimeType(event.dataTransfer.types);
        var itemType = getItemType(mimeType);
        if (!mimeType || !isDropAllowed(itemType)) return true;

        // Make sure the placeholder is shown, which is especially important if the list is empty.
        if (placeholderNode.parentNode != listNode) {
          element.append(placeholder);
        }

        if (event.target != listNode) {
          // Try to find the node direct directly below the list node.
          var listItemNode = event.target;
          
          while (listItemNode.parentNode != listNode && listItemNode.parentNode) {
            listItemNode = listItemNode.parentNode;
          }

          if (listItemNode.parentNode == listNode && listItemNode != placeholderNode) {
            // If the mouse pointer is in the upper half of the list item element,
            // we position the placeholder before the list item, otherwise after it.
            var rect = listItemNode.getBoundingClientRect();
            if (listSettings.horizontal) {
              var isFirstHalf = event.clientX < rect.left + rect.width / 2;
            } else {
              var isFirstHalf = event.clientY < rect.top + rect.height / 2;
            }
            listNode.insertBefore(placeholderNode,
                isFirstHalf ? listItemNode : listItemNode.nextSibling);
          }
        }

        // In IE we set a fake effectAllowed in dragstart to get the correct cursor, we therefore
        // ignore the effectAllowed passed in dataTransfer. We must also not access dataTransfer for
        // drops from external sources, as that throws an exception.
        var ignoreDataTransfer = mimeType == MSIE_MIME_TYPE;
        var dropEffect = getDropEffect(event, ignoreDataTransfer);
        if (dropEffect == 'none') return stopDragover();

        // At this point we invoke the callback, which still can disallow the drop.
        // We can't do this earlier because we want to pass the index of the placeholder.
        if (attr.dndDragover && !invokeCallback(attr.dndDragover, event, dropEffect, itemType)) {
          return stopDragover();
        }

        // Set dropEffect to modify the cursor shown by the browser, unless we're in IE, where this
        // is not supported. This must be done after preventDefault in Firefox.
        event.preventDefault();
        if (!ignoreDataTransfer) {
          event.dataTransfer.dropEffect = dropEffect;
        }

        element.addClass("dndDragover");
        event.stopPropagation();
        return false;
      });
		  
		/**
       * When the element is dropped, we use the position of the placeholder element as the
       * position where we insert the transferred data. This assumes that the list has exactly
       * one child element per array element.
       */
      element.on('drop', function(event) {
        event = event.originalEvent || event;

        // Check whether the drop is allowed and determine mime type.
        var mimeType = getMimeType(event.dataTransfer.types);
        var itemType = getItemType(mimeType);
        if (!mimeType || !isDropAllowed(itemType)) return true;

        // The default behavior in Firefox is to interpret the dropped element as URL and
        // forward to it. We want to prevent that even if our drop is aborted.
        event.preventDefault();

        // Unserialize the data that was serialized in dragstart.
        try {
          var data = JSON.parse(event.dataTransfer.getData(mimeType));
        } catch(e) {
          return stopDragover();
        }

        // Drops with invalid types from external sources might not have been filtered out yet.
        if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE) {
          itemType = data.type || undefined;
          data = data.item;
          if (!isDropAllowed(itemType)) return stopDragover();
        }

        // Special handling for internal IE drops, see dragover handler.
        var ignoreDataTransfer = mimeType == MSIE_MIME_TYPE;
        var dropEffect = getDropEffect(event, ignoreDataTransfer);
        if (dropEffect == 'none') return stopDragover();

        // Invoke the callback, which can transform the transferredObject and even abort the drop.
        var index = getPlaceholderIndex();
        if (attr.dndDrop) {
          data = invokeCallback(attr.dndDrop, event, dropEffect, itemType, index, data);
          if (!data) return stopDragover();
        }

        // The drop is definitely going to happen now, store the dropEffect.
        dndState.dropEffect = dropEffect;
        if (!ignoreDataTransfer) {
          event.dataTransfer.dropEffect = dropEffect;
        }

        // Insert the object into the array, unless dnd-drop took care of that (returned true).
        if (data !== true) {
          scope.$apply(function() {
            scope.$eval(attr.dndList).splice(index, 0, data);
          });
        }
        invokeCallback(attr.dndInserted, event, dropEffect, itemType, index, data);

        // Clean up
        stopDragover();
        event.stopPropagation();
        return false;
      }); 
		
		 /**
       * We have to remove the placeholder when the element is no longer dragged over our list. The
       * problem is that the dragleave event is not only fired when the element leaves our list,
       * but also when it leaves a child element. Therefore, we determine whether the mouse cursor
       * is still pointing to an element inside the list or not.
       */
      element.on('dragleave', function(event) {
        event = event.originalEvent || event;

        var newTarget = document.elementFromPoint(event.clientX, event.clientY);
        if (listNode.contains(newTarget) && !event._dndPhShown) {
          // Signalize to potential parent lists that a placeholder is already shown.
          event._dndPhShown = true;
        } else {
          stopDragover();
        }
      });  
		  
	
		  
		  
		  
		  
	  /**
       * Given the types array from the DataTransfer object, returns the first valid mime type.
       * A type is valid if it starts with MIME_TYPE, or it equals MSIE_MIME_TYPE or EDGE_MIME_TYPE.
       */
      function getMimeType(types) {
        if (!types) return MSIE_MIME_TYPE; // IE 9 workaround.
        for (var i = 0; i < types.length; i++) {
          if (types[i] == MSIE_MIME_TYPE || types[i] == EDGE_MIME_TYPE ||
              types[i].substr(0, MIME_TYPE.length) == MIME_TYPE) {
            return types[i];
          }
        }
        return null;
      }
          /**
       * Determines the type of the item from the dndState, or from the mime type for items from
       * external sources. Returns undefined if no item type was set and null if the item type could
       * not be determined.
       */
      function getItemType(mimeType) {
        if (dndState.isDragging) return dndState.itemType || undefined;
        if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE) return null;
        return (mimeType && mimeType.substr(MIME_TYPE.length + 1)) || undefined;
      }
      /**
       * Checks various conditions that must be fulfilled for a drop to be allowed, including the
       * dnd-allowed-types attribute. If the item Type is unknown (null), the drop will be allowed.
       */
      function isDropAllowed(itemType) {
        if (listSettings.disabled) return false;
        if (!listSettings.externalSources && !dndState.isDragging) return false;
        if (!listSettings.allowedTypes || itemType === null) return true;
        return itemType && listSettings.allowedTypes.indexOf(itemType) != -1;
      }


		/**
       * Determines which drop effect to use for the given event. In Internet Explorer we have to
       * ignore the effectAllowed field on dataTransfer, since we set a fake value in dragstart.
       * In those cases we rely on dndState to filter effects. Read the design doc for more details:
       * https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
       */
      function getDropEffect(event, ignoreDataTransfer) {
        var effects = ALL_EFFECTS;
        if (!ignoreDataTransfer) {
          effects = filterEffects(effects, event.dataTransfer.effectAllowed);
        }
        if (dndState.isDragging) {
          effects = filterEffects(effects, dndState.effectAllowed);
        }
        if (attr.dndEffectAllowed) {
          effects = filterEffects(effects, attr.dndEffectAllowed);
        }
        // MacOS automatically filters dataTransfer.effectAllowed depending on the modifier keys,
        // therefore the following modifier keys will only affect other operating systems.
        if (!effects.length) {
          return 'none';
        } else if (event.ctrlKey && effects.indexOf('copy') != -1) {
          return 'copy';
        } else if (event.altKey && effects.indexOf('link') != -1) {
          return 'link';
        } else {
          return effects[0];
        }
      }
      
      
  	/**
       * Small helper function that cleans up if we aborted a drop.
       */
      function stopDragover() {
        placeholder.remove();
        element.removeClass("dndDragover");
        return true;
      }
    /**
       * Invokes a callback with some interesting parameters and returns the callbacks return value.
       */
      function invokeCallback(expression, event, dropEffect, itemType, index, item) {
        return $parse(expression)(scope, {
          callback: dndState.callback,
          dropEffect: dropEffect,
          event: event,
          external: !dndState.isDragging,
          index: index !== undefined ? index : getPlaceholderIndex(),
          item: item || undefined,
          type: itemType
        });
      }

		  
		  
		       /**
		       * We use the position of the placeholder node to determine at which position of the array the
		       * object needs to be inserted
		       */
		      function getPlaceholderIndex() {
		        return Array.prototype.indexOf.call(listNode.children, placeholderNode);
		      }
		
		      /**
		       * Tries to find a child element that has the dndPlaceholder class set. If none was found, a
		       * new li element is created.
		       */
		      function getPlaceholderElement() {
		        var placeholder;
		        angular.forEach(element.children(), function(childNode) {
		          var child = angular.element(childNode);
		          if (child.hasClass('dndPlaceholder')) {
		            placeholder = child;
		          }
		        });
		        return placeholder || angular.element("<div class='dndPlaceholder'></div>");
		      } 
		  
		  
      };
}]);
  
  
  
  
  /**
   * Filters an array of drop effects using a HTML5 effectAllowed string.
   */
  function filterEffects(effects, effectAllowed) {
    if (effectAllowed == 'all') return effects;
    return effects.filter(function(effect) {
      return effectAllowed.toLowerCase().indexOf(effect) != -1;
    });
  }

  
  
	/**
   * For some features we need to maintain global state. This is done here, with these fields:
   * - callback: A callback function set at dragstart that is passed to internal dropzone handlers.
   * - dropEffect: Set in dragstart to "none" and to the actual value in the drop handler. We don't
   *   rely on the dropEffect passed by the browser, since there are various bugs in Chrome and
   *   Safari, and Internet Explorer defaults to copy if effectAllowed is copyMove.
   * - effectAllowed: Set in dragstart based on dnd-effect-allowed. This is needed for IE because
   *   setting effectAllowed on dataTransfer might result in an undesired cursor.
   * - isDragging: True between dragstart and dragend. Falsy for drops from external sources.
   * - itemType: The item type of the dragged element set via dnd-type. This is needed because IE
   *   and Edge don't support custom mime types that we can use to transfer this information.
   */
  var dndState = {};
  console.log(dndState);
	
})(angular.module('dndLists', []));