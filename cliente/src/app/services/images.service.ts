import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../interfaces/images.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private URLApi = 'http://localhost:4000/api/images'
  private images: Image[] = []
  private image: Image = {
    autor: '',
    descripcion: '',
    nombre: '',
    url: '',
    originalNameImage: '',
    uuid: '',
  }


  get Images() {
    return [...this.images];
  }

  get Image() {
    return this.image;
  }

  constructor(private http: HttpClient) { }

  getImages() {
    this.http.get<Image[]>(`${this.URLApi}/`).subscribe((data) => {
      this.images = data;
    })
  }

  getImageById(id: string) {
    this.http.get<Image>(`${this.URLApi}/${id}`).subscribe((data) => {
      this.image = data;
    })
  }

  createImage(formData: FormData) {
    this.http.post<Image>(`${this.URLApi}/png`, formData).subscribe((data) => {
      console.log(data)
      this.images.push(data);
    })
  }

  createImageJpg(formData: FormData) {
    this.http.post<Image>(`${this.URLApi}/`, formData).subscribe((data) => {
      console.log(data)
      this.images.push(data);
    })
  }

  dowlonadImage(formData: FormData) {
    this.http.post<any>(`${this.URLApi}/convert-and-download`, formData, { responseType: 'blob' as 'json' }).subscribe((data) => {
      console.log(data)
      const blob = new Blob([data], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }


  getImagesByBewteen(start: string, end: string) {
    const params = new HttpParams()
      .set('startDate', start)
      .set('endDate', end)

    this.http.get<Image[]>(`${this.URLApi}/search/`, { params }).subscribe((data) => {
      console.log('aqui')
      console.log(data)
      this.images = data;
    })
  }
}
