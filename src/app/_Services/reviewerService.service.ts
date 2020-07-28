import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reviewer } from '../_Data/Reviewer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewerServiceService {
  baseUrl: string = environment.BooksCatalogApiUrl;
constructor(private httpclient: HttpClient) { }

GetReviewer(userId: number): Observable<Reviewer> {
  const reviewersUrl = 'Reviewers/Username/' + userId;
  return this.httpclient.get<Reviewer>(this.baseUrl + reviewersUrl);
}
}


