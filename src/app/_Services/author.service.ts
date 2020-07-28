import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Author } from '../_Data/Author';
import { Book } from '../_Data/Book';
import { Country } from '../_Data/Country';
import { PaginatedResult } from '../_Data/PaginatedResult';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
baseUrl = environment.BooksCatalogApiUrl;
constructor(private httpClient: HttpClient) { }

GetAuthors(page?, itemsPerPage? ): Observable<PaginatedResult<Author[]>> {
  const paginatedResult: PaginatedResult<Author[]> = new PaginatedResult<Author[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  const authorsUrl = 'Authors';
  return this.httpClient.get<Author[]>(this.baseUrl + authorsUrl, {observe: 'response', params})
  .pipe(map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}
GetAuthor(authorId: number): Observable<Author> {
  const authorUrl = 'Authors/' + authorId;
  return this.httpClient.get<Author>(this.baseUrl + authorUrl);
}
GetAuthorBooks(authorId: number): Observable<Book[]> {
  const authorUrl = 'Authors/' + authorId + '/Books';
  return this.httpClient.get<Book[]>(this.baseUrl + authorUrl);
}
GetAuthorCountry(authorId: number): Observable<Country> {
  const authorUrl = 'Countries/' + authorId + '/Country';
  return this.httpClient.get<Country>(this.baseUrl + authorUrl);
}

GetAuthorBooksForDisplay(authorId: number, pageNumber?, pageSize?): Observable<PaginatedResult<Book[]>>  {
  const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult();
  const params = new HttpParams();

  if (pageNumber != null && pageSize != null) {
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
  }
  const authorUrl = 'Authors/' + authorId + '/Books';
  return this.httpClient.get<Book[]>(this.baseUrl + authorUrl, {observe: 'response', params})
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

searchAuthors(searchTerm: string, pageNumber?, pageSize?): Observable<PaginatedResult<Author[]>> {
  const params = new HttpParams();
  if (pageNumber != null && pageSize != null) {
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
  }

  const authorsUrl = 'Authors/Search/' + searchTerm;
  const paginatedResult: PaginatedResult<Author[]> = new PaginatedResult<Author[]>();
  return this.httpClient.get<Author[]>(this.baseUrl + authorsUrl, {observe: 'response'})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      return paginatedResult;
    })
  );
}

DeleteAuthorPhoto(author: Author ) {
  const authorsUrl = 'Authors/RemovePhoto/';
  return this.httpClient.put(this.baseUrl + authorsUrl + author.AuthorId, author);
}

CreateAuthor(author: Author) {
  const authorsUrl = 'Authors/' ;
  return this.httpClient.post<Author[]>(this.baseUrl + authorsUrl, author);
}

UpdateAuthorCountry(author: Author) {
  const authorsUrl = 'Authors/UpdateCountry/' + author.AuthorId;
  return this.httpClient.put(this.baseUrl + authorsUrl, author);
}

UpdateAuthor(author: Author) {
  const authorsUrl = 'Authors/' + author.AuthorId;
  author.CountryId = author.Country.CountryId;
  return this.httpClient.put(this.baseUrl + authorsUrl, author);
}

RemoveAuthor(author: Author) {
  return this.httpClient.delete<Author[]>(this.baseUrl + author.AuthorId);
}
}


