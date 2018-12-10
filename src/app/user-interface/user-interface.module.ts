import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatCardModule, MatDialogModule, MatButtonModule, MatRadioModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


const materialModules = [
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatRadioModule,
  MatInputModule,
];

const imports = [
  CommonModule,
  ReactiveFormsModule,
  ...materialModules,
];

const declarations = [
  BreadcrumbComponent
];

const exports = [
  ...imports,
  ...declarations,
];

@NgModule({
  declarations,
  imports: [
    RouterModule,
    ...imports,
  ],
  exports,
})
export class UserInterfaceModule { }
