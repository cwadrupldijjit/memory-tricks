import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubtractiveIndexComponent } from './subtractive-index/subtractive-index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SubtractiveIndexComponent },
  {
    path: 'remove-a-phrase',
    loadChildren: () => import('./remove-a-phrase/remove-a-phrase.module').then(m => m.RemoveAPhraseModule),
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
