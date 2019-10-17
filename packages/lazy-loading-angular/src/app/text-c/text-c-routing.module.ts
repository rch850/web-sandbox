import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextCComponent } from './text-c.component';

const routes: Routes = [{ path: '', component: TextCComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextCRoutingModule { }
