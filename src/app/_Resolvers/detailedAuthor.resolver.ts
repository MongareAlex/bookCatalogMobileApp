import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../_Data/Author';
import { AuthorsService } from '../_Services/author.service';

@Injectable()
// tslint:disable-next-line: class-name
export class detailedAuthorResolver implements Resolve<Author> {
    constructor(private authorService: AuthorsService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Author> {
    return this.authorService.GetAuthor(route.params.id).pipe(
        catchError(error => {
            console.error('Error occured loading authors');
            this.router.navigate(['/Authors']);
            return of(null);
        })
    );
    }
}
