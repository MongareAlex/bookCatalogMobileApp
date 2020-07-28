import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  imageUrls?: string[];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.imageUrls = [];
        const images = this.router.getCurrentNavigation().extras.state.imageUrls;
        images.forEach(image => {
          if (image != null){
             this.imageUrls.push(image);
          }
        });
        console.log(this.imageUrls.length);
        console.log(this.imageUrls);
      }
    });
  }

}
