import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBComponent } from './text-b.component';
import { TextBRoutingModule } from './text-b-routing.module';

@NgModule({
  declarations: [
    TextBComponent
  ],
  imports: [
    CommonModule,
    TextBRoutingModule
  ]
})
export class TextBModule { }
