import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagesPageComponent } from './pages/images-page/images-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { ViewImageComponent } from './pages/view-image/view-image.component';

const routes: Routes = [
  { path: '', component: UploadPageComponent, pathMatch: 'full' },
  { path: 'list-image', component: ImagesPageComponent },
  { path: 'view-image/:id', component: ViewImageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
