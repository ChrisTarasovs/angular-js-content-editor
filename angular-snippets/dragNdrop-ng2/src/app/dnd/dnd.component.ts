import { Component, OnInit } from '@angular/core';
import { TextComponent } from './text/text.component';

@Component({
  selector: 'app-root',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent  {
   widgets: Array<any> = [];
   containers: Array<any> = [];
   
   constructor(){
     this.containers.push(new Container([new Widget('sds')]));
    
     this.widgets.push(new Widget('Text a'));
     this.widgets.push(new Widget('Text b'));
   }
   
   drop(item){
   console.log(222);
    var target = item.mouseEvent.target,
        index;
    
    if(target.classList.contains('row')) {
        index = target.getAttribute('data-index');
    }
    
    if(target.classList.contains('item') && target.parentNode.classList.contains('row')) {
        index = target.parentNode.getAttribute('data-index');
    }
    
    if(index) {
        console.log(this.containers);
        console.log(this.containers[index]);
        this.containers[index].widgets.push( item.dragData);
    } else {
        this.containers.push([ item.dragData]);
    }
    
    
   }
   
   dragEnter(element){
   }
}

class Container {
  constructor(public widgets: Array<Widget>) {}
}

class Widget {
  constructor(public name: string) {}
}

//Callbacks:
//dnd-dragstart
//dnd-moved  
//dnd-copied
//dnd-linked 
//dnd-canceled   
//dnd-dragend 
//dnd-selected  
//dnd-callback

// dragenter
// dragover
// dnd-inserted 
// dragend

// element.on('drop', function(event)
// dndState.dropEffect 
// element.on('dragleave', function(event) 
// function getMimeType(types) 
// function getItemType(mimeType) 
// function isDropAllowed(itemType) 
// function getDropEffect(event, ignoreDataTransfer)
// function stopDragover()
// function invokeCallback(expression, event, dropEffect, itemType, index, item)

// function getPlaceholderIndex()
// function getPlaceholderElement()
// dndLists.directive('dndNodrag', function()
// element.on('dragend', function(event)
// dndLists.directive('dndHandle', function()

