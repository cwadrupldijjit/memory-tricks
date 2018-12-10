import { NgModule } from '@angular/core';

import { SubtractiveStrategiesRoutingModule } from './subtractive-strategies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SubtractiveIndexComponent } from './subtractive-index/subtractive-index.component';

@NgModule({
  declarations: [
    SubtractiveIndexComponent,
  ],
  imports: [
    SharedModule,
    SubtractiveStrategiesRoutingModule
  ]
})
export class SubtractiveStrategiesModule { }
