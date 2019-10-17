import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextBComponent } from './text-b.component';

const routes: Routes = [
    {
        path: '',
        component: TextBComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TextBRoutingModule {}