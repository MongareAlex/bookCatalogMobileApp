import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../_Data/Author';
import { AuthorsService } from '../_Services/author.service';

@Injectable()

// tslint:disable-next-line: class-name
export class authorListResolver implements Resolve<Author[]> {
    constructor(private authorService: AuthorsService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
    return this.authorService.GetAuthors().pipe(
        catchError(error => {
            this.router.navigate(['/home']);
            return of(null);
        })
    );
    }
}

