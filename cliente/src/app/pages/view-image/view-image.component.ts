import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styles: [
  ]
})
export class ViewImageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceImages: ImagesService
  ) { }

  get id() {
    return this.route.snapshot.paramMap.get('id');
  }

  get image() {
    return this.serviceImages.Image;
  }

  ngOnInit() {
    this.serviceImages.getImageById(this.id!);
  }

  goBack() {
    this.router.navigateByUrl('/list-image');
  }
}
