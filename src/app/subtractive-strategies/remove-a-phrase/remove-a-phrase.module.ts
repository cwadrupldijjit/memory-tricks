import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { RemoveAPhraseRoutingModule } from './remove-a-phrase-routing.module';
import { RemoveAPhraseComponent } from './remove-a-phrase.component';
import { AddAPhraseComponent } from './add-a-phrase/add-a-phrase.component';
import { RemoveAPhraseTrainComponent } from './remove-a-phrase-train/remove-a-phrase-train.component';

@NgModule({
  declarations: [
    RemoveAPhraseComponent,
    AddAPhraseComponent,
    RemoveAPhraseTrainComponent,
  ],
  imports: [
    SharedModule,
    RemoveAPhraseRoutingModule,
  ],
})
export class RemoveAPhraseModule { }
