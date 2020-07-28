import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Book } from 'src/app/_Data/Book';
import { IonInfiniteScroll } from '@ionic/angular';
import { ReviewService } from 'src/app/_Services/review.service';

@Component({
  selector: 'app-book-detailed',
  templateUrl: './book-detailed.page.html',
  styleUrls: ['./book-detailed.page.scss'],
})
export class BookDetailedPage implements OnInit {
  book?: Book;
  imageUrls?: string[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private route: ActivatedRoute,
              private reviewService: ReviewService,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.book = data.bookDetailed;
      this.imageUrls = [];
      this.book.bookImages.forEach(image => {
        if (image.ImageUrl != null){
          this.imageUrls.push(image.ImageUrl);
        }
         });
      console.log(this.imageUrls);
    }
    );
  }
  reviewClick(){
    console.log('redirecting to review');
  }
  loadData(event){
    if (this.book.ReviewsList.length < 20){
    this.reviewService.GetBookReviews(this.book.Id).subscribe(
    (reviewsObject) => {
      console.log(reviewsObject.result);
      reviewsObject.result.forEach(
        (review) => {
          this.book.ReviewsList.push(review);
        }
      );
      console.log('completed');
      return;
    });
    }
    event.target.complete();

  }

  loadReviews(){

  }
  viewGallery(){
    const navigationExtras: NavigationExtras = { state: { imageUrls: this.imageUrls } };
    this.router.navigate(['gallery'], navigationExtras);
  }

}
