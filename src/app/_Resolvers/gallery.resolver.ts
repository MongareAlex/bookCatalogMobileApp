import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GalleryService } from '../_Services/gallery.service';

@Injectable({
  providedIn: 'root'
})

export class GalleryResolverService implements Resolve<any>{

    constructor(private galleryService: GalleryService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.galleryService.getPhotos();
    }
}
