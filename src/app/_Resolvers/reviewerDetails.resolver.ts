import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reviewer } from '../_Data/Reviewer';
import { ReviewerServiceService } from '../_Services/reviewerService.service';
import { AuthService } from '../_Services/auth.service';

@Injectable()

// tslint:disable-next-line: class-name
export class reviewerDetailsReolver implements Resolve<Reviewer> {
    constructor(private reviewerService: ReviewerServiceService,
                private router: Router,
                private authService: AuthService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Reviewer> {

                return this.reviewerService.GetReviewer(this.authService.getUserInfo().UniqueId).pipe(
                    catchError(error => {
                        console.error('problem retrieving data');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                );

    }
}

