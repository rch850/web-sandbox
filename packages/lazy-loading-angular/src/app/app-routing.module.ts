import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'a', loadChildren: () => import('./text-a/text-a.module').then(m => m.TextAModule) },
  { path: 'b', loadChildren: () => import('./text-b/text-b.module').then(m => m.TextBModule) },
  { path: 'c', loadChildren: () => import('./text-c/text-c.module').then(m => m.TextCModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
