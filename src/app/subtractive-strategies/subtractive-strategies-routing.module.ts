import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubtractiveIndexComponent } from './subtractive-index/subtractive-index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SubtractiveIndexComponent },
  {
    path: 'remove-a-phrase',
    loadChildren: './remove-a-phrase/remove-a-phrase.module#RemoveAPhraseModule',
    data: {
      breadcrumb: 'Remove a Phrase',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtractiveStrategiesRoutingModule { }
