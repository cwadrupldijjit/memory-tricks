import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemoveAPhraseComponent } from './remove-a-phrase/remove-a-phrase.component';
import { SubtractiveIndexComponent } from './subtractive-index/subtractive-index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SubtractiveIndexComponent },
  { path: 'remove-a-phrase', component: RemoveAPhraseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtractiveStrategiesRoutingModule { }
