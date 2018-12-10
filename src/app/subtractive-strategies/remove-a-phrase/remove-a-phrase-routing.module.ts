import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemoveAPhraseComponent } from './remove-a-phrase.component';
import { AddAPhraseComponent } from './add-a-phrase/add-a-phrase.component';
import { RemoveAPhraseTrainComponent } from './remove-a-phrase-train/remove-a-phrase-train.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RemoveAPhraseComponent,
    data: {
      breadcrumb: false,
    },
  },
  { path: 'add', component: AddAPhraseComponent },
  { path: ':id', pathMatch: 'full', component: AddAPhraseComponent },
  { path: 'train/:id', component: RemoveAPhraseTrainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoveAPhraseRoutingModule {}
