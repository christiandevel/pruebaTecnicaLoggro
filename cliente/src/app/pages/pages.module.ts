import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { ComponentsModule } from '../components/components.module';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { ImagesPageComponent } from './images-page/images-page.component';
import { ViewImageComponent } from './view-image/view-image.component';



@NgModule({
  declarations: [
    UploadPageComponent,
    ImagesPageComponent,
    ViewImageComponent
  ],
  exports: [
    UploadPageComponent,
    ImagesPageComponent
  ],
  imports: [
    MaterialModule,
    ComponentsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
