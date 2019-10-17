import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextCRoutingModule } from './text-c-routing.module';
import { TextCComponent } from './text-c.component';


@NgModule({
  declarations: [TextCComponent],
  imports: [
    CommonModule,
    TextCRoutingModule
  ]
})
export class TextCModule { }
