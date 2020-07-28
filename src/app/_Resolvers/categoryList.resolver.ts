import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../_Data/Category';
import { CategoryService } from '../_Services/category.service';

@Injectable()
// tslint:disable-next-line: class-name
export class categoryListResolver implements Resolve<Category[]> {
    constructor(private categoryService: CategoryService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {
    return this.categoryService.GetCategories().pipe(
        catchError(error => {
            console.error('problem retrieving categories data');
            this.router.navigate(['/home']);
            return of(null);
        })
    );
    }
}
