import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../_Data/Category';
import { CategoryService } from '../_Services/category.service';

@Injectable()
// tslint:disable-next-line: class-name
export class detailedCategoryResolver implements Resolve<Category> {
    constructor(private categoryService: CategoryService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
    return this.categoryService.GetCategory(route.params.id).pipe(
        catchError(error => {
            console.error('problem retrieving category data');
            this.router.navigate(['/Categories']);
            return of(null);
        })
    );
    }
}
