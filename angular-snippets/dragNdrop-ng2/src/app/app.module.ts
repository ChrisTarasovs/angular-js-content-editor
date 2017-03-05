import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {DndModule} from 'ng2-dnd';

import { DndComponent } from './dnd/dnd.component';

@NgModule({
  declarations: [
    DndComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [DndComponent]
})
export class AppModule { }
