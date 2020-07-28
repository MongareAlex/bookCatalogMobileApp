import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../_Data/Book';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryService } from '../_Services/category.service';

@Injectable()
// tslint:disable-next-line: class-name
export class booksInCategoryResolver implements Resolve<Book[]> {
    constructor(private categoryService: CategoryService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
    return this.categoryService.GetCategoryBooksForDisplay(route.params.categoryId).pipe(
        catchError(error => {
            console.error('problem retrieving books for category');
            this.router.navigate(['/home']);
            return of(null);
        })
    );
    }
}
