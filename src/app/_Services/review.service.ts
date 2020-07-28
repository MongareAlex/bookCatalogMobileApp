import { Injectable } from '@angular/core';
import { Review } from '../_Data/Review';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_Data/User';
import { AuthService } from './auth.service';
import { PaginatedResult } from '../_Data/PaginatedResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
baseUrl: string = environment.BooksCatalogApiUrl;
constructor(private httpclient: HttpClient, private authService: AuthService) { }

AddReview(review: Review): Observable<any> {
  const reviewerId = this.authService.getUserInfo().UniqueId;
  const url = 'Reviews/' + reviewerId + '/Review';
  return this.httpclient.post<Review>(this.baseUrl + url, review);
}

GetBookReviews(bookId, page?: string , itemsPerPage?: string ): Observable<PaginatedResult<Review[]>> {
  const paginatedResult: PaginatedResult<Review[]> = new PaginatedResult<Review[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  const reviewsUrl = 'Reviews/' + bookId + '/Reviews';
  return this.httpclient.get<Review[]>(this.baseUrl + reviewsUrl, {observe: 'response', params})
  .pipe(map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}


GetReviewerReviews(reviewerId: number, page?: string , itemsPerPage?: string ): Observable<PaginatedResult<Review[]>> {
  const paginatedResult: PaginatedResult<Review[]> = new PaginatedResult<Review[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  const reviewsUrl = 'Reviewers/' + reviewerId + '/Reviews';
  return this.httpclient.get<Review[]>(this.baseUrl + reviewsUrl, {observe: 'response', params})
  .pipe(map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}


GetReview(reviewId: number): Observable<Review> {
  const reviewsUrl = 'Reviews/' + reviewId;
  return this.httpclient.get<Review>(this.baseUrl + reviewsUrl);
}


deleteReview(reviewToDelete: Review) {
  const countriesUrl = 'Review/';
  return this.httpclient.delete(this.baseUrl + countriesUrl + reviewToDelete.ReviewId);
}
}
