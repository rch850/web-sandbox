import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAComponent } from './text-a.component';
import { TextARoutingModule } from './text-a-routing.module';

@NgModule({
  declarations: [
    TextAComponent
  ],
  imports: [
    CommonModule,
    TextARoutingModule
  ]
})
export class TextAModule { }
