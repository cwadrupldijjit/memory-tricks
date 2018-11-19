import { NgModule } from '@angular/core';

import { SubtractiveStrategiesRoutingModule } from './subtractive-strategies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RemoveAPhraseComponent } from './remove-a-phrase/remove-a-phrase.component';
import { SubtractiveIndexComponent } from './subtractive-index/subtractive-index.component';

@NgModule({
  declarations: [
    RemoveAPhraseComponent,
    SubtractiveIndexComponent,
  ],
  imports: [
    SharedModule,
    SubtractiveStrategiesRoutingModule
  ]
})
export class SubtractiveStrategiesModule { }
