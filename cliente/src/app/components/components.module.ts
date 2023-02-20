import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { UploadInputComponent } from './upload-input/upload-input.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    UploadInputComponent
  ],
  exports: [
    UploadInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ToastrModule.forRoot()
  ]
})
export class ComponentsModule { }
