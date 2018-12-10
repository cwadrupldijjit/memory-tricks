import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatRadioModule,
  MatInputModule,
} from '@angular/material';
import { PersistenceDirective } from './persistence.directive';
import { UserInterfaceModule } from '../user-interface/user-interface.module';

const sharedItems = [
  UserInterfaceModule,
  PersistenceDirective,
];

@NgModule({
  declarations: [
    PersistenceDirective,
  ],
  exports: sharedItems,
  imports: [
    UserInterfaceModule,
  ],
})
export class SharedModule { }
