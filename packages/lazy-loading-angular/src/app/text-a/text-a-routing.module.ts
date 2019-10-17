import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextAComponent } from './text-a.component';

const routes: Routes = [
    {
        path: '',
        component: TextAComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TextARoutingModule {}