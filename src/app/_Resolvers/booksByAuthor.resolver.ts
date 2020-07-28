import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../_Data/Book';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorsService } from '../_Services/author.service';

@Injectable()
// tslint:disable-next-line: class-name
export class booksByAuthorResolver implements Resolve<Book[]> {
    constructor(private authorService: AuthorsService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
    return this.authorService.GetAuthorBooksForDisplay(route.params.authorId).pipe(
        catchError(error => {
            console.error('problem retrieving books data for the author');
            this.router.navigate(['/home']);
            return of(null);
        })
    );
    }
}
