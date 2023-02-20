import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styles: [
  ]
})
export class UploadPageComponent implements OnInit {

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.imagesService.getImages();
  }

}
