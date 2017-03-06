import { Component, OnInit } from '@angular/core';
import { TextComponent } from './text/text.component';





@Component({
  selector: 'app-root',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent  {
    dragOperation: Boolean = false;
   widgets: Array<any> = [];
   containers: Array<any> = [];
   
   constructor(){
     this.containers.push(new Container(1, [new Widget('1')]));
      this.containers.push(new Container(2, [new Widget('2')]));
    
     this.widgets.push(new Widget('Text a'));
   }
   
   drop(item){
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
   
   onDropSuccess(widget: any, event: any) {
    this.dragOperation = false;
    console.log('onDropSuccess', widget, event);
   }
   
   onDragStart(widget: any, event: any) {
    console.log('onDragStart', widget, event);
   }
   
   onDragEnter(widget: any, event: any) {
    console.log('onDragEnter', widget, event);
   }
   
   onDragSuccess(widget: any, event: any) {
    console.log('onDragSuccess', widget, event);
   }
   
   onDragOver(widget: any, event: any) {
    console.log('onDragOver', widget, event);
   }
   
   onDragEnd(widget: any, event: any) {
    console.log('onDragOver', widget, event);
   }
onDragLeave(widget: any, event: any) {
    console.log('onDragLeave', widget, event);
   }
   
   
   onMouseDown(){
    this.dragOperation = true;
    console.log('mouse down');
   }
   
   onMouseUp(event: any){
    console.log(event);
    this.dragOperation = false;
   }
}

class Container {
  constructor(public id: Number, public widgets: Array<Widget>) {}
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

