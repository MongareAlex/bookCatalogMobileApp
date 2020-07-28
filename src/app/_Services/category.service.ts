import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../_Data/Category';
import { Observable } from 'rxjs';
import { Book } from '../_Data/Book';
import { PaginatedResult } from '../_Data/PaginatedResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
baseUrl = environment.BooksCatalogApiUrl;
constructor(private httpClient: HttpClient) { }

GetCategories(pageNumber?, pageSize?): Observable<PaginatedResult<Category[]>> {
  const paginatedResult: PaginatedResult<Category[]> = new PaginatedResult();
  const categoriesUrl = 'Categories';
  let params = new HttpParams();

  if (pageNumber != null && pageSize != null) {
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
  }
  return this.httpClient.get<Category[]>(this.baseUrl + categoriesUrl, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }

    )
  );
}
RemoveCategoryIcon(category: Category) {
  const Url = 'Categories/RemovePhoto/';
  return this.httpClient.put(this.baseUrl + Url + category.CategoryId, category);
}

GetCategory(CategoryId: number): Observable<Category> {
  const categoriesUrl = 'Categories/';
  return this.httpClient.get<Category>(this.baseUrl + categoriesUrl + CategoryId);
}

GetCategoryBooksForDisplay(categoryId: number, pageNumber?, pageSize?): Observable<PaginatedResult<Book[]>> {
  const categoriesUrl = 'Categories/' + categoryId + '/Books';
  const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult();
  const params = new HttpParams();

  if (pageNumber != null && pageSize != null) {
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
  }
  return this.httpClient.get<Book[]>(this.baseUrl + categoriesUrl, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }

    )
  );
}

SearchCategory(searchedCategoryTerm: string): Observable<Category[]> {
  const categoriesUrl = 'Categories/Search/';
  return this.httpClient.get<Category[]>(this.baseUrl + categoriesUrl + searchedCategoryTerm);
}

SearchCategoryForDisplay(searchedCategoryTerm: string, pageNumber?, pageSize?): Observable<PaginatedResult<Category[]>> {
  const categoriesUrl = 'Categories/Search/';
  const paginatedResult: PaginatedResult<Category[]> = new PaginatedResult();
  const params = new HttpParams();

  if (pageNumber != null && pageSize != null) {
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
  }
  return this.httpClient.get<Category[]>(this.baseUrl + categoriesUrl + searchedCategoryTerm, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }

    )
  );
}

GetCategoryBooks(CategoryId: number): Observable<Book[]> {
  const categoriesUrl = 'Categories/';
  return this.httpClient.get<Book[]>(this.baseUrl + categoriesUrl + CategoryId + '/Books' );
}

UpdateCategory(category: Category) {
  const categoriesUrl = 'Categories/UpdateCategory/';
  return this.httpClient.put(this.baseUrl + categoriesUrl + category.CategoryId , category );
}
CreateCategory(category: Category) {
  const categoriesUrl = 'Categories/';
  return this.httpClient.post(this.baseUrl + categoriesUrl, category);
}
DeleteCategory(categoryId: number) {
  const categoriesUrl = 'Categories/' + categoryId;
  return this.httpClient.delete(this.baseUrl + categoriesUrl);
}


}
