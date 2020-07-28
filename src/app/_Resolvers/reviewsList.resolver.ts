import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from '../_Data/Review';
import { ReviewService } from '../_Services/review.service';
import { PaginatedResult } from '../_Data/PaginatedResult';

@Injectable()

// tslint:disable-next-line: class-name
export class reviewsListForBookResolver implements Resolve<PaginatedResult<Review[]>> {
    constructor(private reviewService: ReviewService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Review[]>> {
    return this.reviewService.GetBookReviews(route.params.bookId).pipe(
        catchError(error => {
            console.error('problem retrieving data');
            this.router.navigate(['/home']);
            return of(null);
        })
    );
    }
}

