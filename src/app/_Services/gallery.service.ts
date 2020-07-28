import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

constructor() { }
photos: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

getPhotos(){}
setPhotos(){}
}
