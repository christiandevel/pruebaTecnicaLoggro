import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  styles: [
  ]
})
export class UploadInputComponent {

  constructor(
    private formBuilder: FormBuilder,
    private imagesService: ImagesService,
    private toastr: ToastrService
  ) { }

  selectedFile!: File;

  form: FormGroup = new FormGroup({});
  favoriteSeason!: number;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
    });
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    formData.append('autor', this.form.get('autor')?.value);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    if (this.favoriteSeason == 1) {
      this.toastr.success('Tu imagen se ha convertido a formato .png y guardado', 'Exitoso!');
      this.imagesService.createImage(formData);

      this.form.reset();
      this.selectedFile = undefined!;
      this.favoriteSeason = 0;
    }

    if (this.favoriteSeason == 2) {
      this.imagesService.createImageJpg(formData);
      this.toastr.success('Tu imagen se ha guardado', 'Exitoso!');
      this.form.reset();
      this.selectedFile = undefined!;
      this.favoriteSeason = 0;
    }
  }

  async downloadImage() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    console.log('download image')
    await this.imagesService.dowlonadImage(formData);
    this.toastr.success('Descargar Completa', 'Exitoso!');
    this.form.reset();
    this.selectedFile = undefined!;
    this.favoriteSeason = 0;
  }
}
