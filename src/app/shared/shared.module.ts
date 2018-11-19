import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatButtonModule, MatRadioModule } from '@angular/material';

const materialModules = [
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatRadioModule,
];

const sharedItems = [
  CommonModule,
  ReactiveFormsModule,
  ...materialModules,
];

@NgModule({
  declarations: [],
  imports: sharedItems,
  exports: sharedItems,
})
export class SharedModule { }
