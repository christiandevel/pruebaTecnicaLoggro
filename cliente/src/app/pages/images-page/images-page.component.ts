import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styles: [
    `
      .container {
        margin-right: auto;
        margin-left: auto;
        max-width: 80%;
      }
  `
  ]
})


export class ImagesPageComponent implements OnInit {
  constructor(
    private imageService: ImagesService,
    private formBuilder: FormBuilder,
  ) { }

  range!: FormGroup;
  get imagesResult() {
    return this.imageService.Images;
  }

  ngOnInit(): void {
    this.imageService.getImages();
    this.range = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  onSubmit() {
    const start = new Date(this.range.value.start);
    const end = new Date(this.range.value.end);
    const startFormat = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
    const endFormat = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;
    this.imageService.getImagesByBewteen(startFormat, endFormat);
  }


}
