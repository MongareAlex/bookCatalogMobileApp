import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../_Data/Book';
import { BooksServiceService } from '../_Services/BooksService.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
// tslint:disable-next-line: class-name
export class detailedBookResolver implements Resolve<Book> {
    constructor(private bookService: BooksServiceService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.bookService.GetBook(route.params.bookId).pipe(
        catchError(error => {
            console.error(error);
            this.router.navigate(['/home']);
            return of(null);
        })
    );
    }
}
