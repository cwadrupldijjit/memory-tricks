import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
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
