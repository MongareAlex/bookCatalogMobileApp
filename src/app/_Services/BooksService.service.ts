import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../_Data/Book';
import { Category } from '../_Data/Category';
import { Author } from '../_Data/Author';
import { Review } from '../_Data/Review';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_Data/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {
  baseUrl = environment.BooksCatalogApiUrl;
constructor(private httpClient: HttpClient) { }
GetBooks(pageNumber?, pageSize?): Observable<PaginatedResult<Book[]>> {
  const booksurl = 'Books';
  const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult();
  let params = new HttpParams();

  if (pageNumber != null && pageSize != null) {
    params = params.append('PageNumber', pageNumber );
    params = params.append('PageSize', pageSize);
  }

  return this.httpClient.get<Book[]>(this.baseUrl + booksurl, {observe: 'response', params })
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

GetBook(BookId: number): Observable<Book> {
  const url = 'Books/BookId/';
  return this.httpClient.get<Book>(this.baseUrl + url + BookId);
}

GetBookCategories(BookId: number): Observable<Category[]> {
  const url = 'Categories/';
  return this.httpClient.get<Category[]>(this.baseUrl + url + BookId + '/Categories');
}

GetBookAuthors(BookId: number): Observable<Author[]> {
  const url = 'Authors/';
  return this.httpClient.get<Author[]>(this.baseUrl + url + BookId + '/Authors');
}

GetBookReviews(BookId: number) {
  const url = 'Reviews/';
  return this.httpClient.get<Review[]>(this.baseUrl + url + BookId + '/Reviews');
}

Create(bookList: Book[]) {

  const url = 'Books';
  if (bookList.length > 1) {
    return this.httpClient.post(this.baseUrl + url, bookList);
  } else {
    console.log('booklist is one');
    let book = new Book();
    book = bookList.pop();
    console.log(book.Title);
    return this.httpClient.post(this.baseUrl + url, book);
  }
}


UpdateBook(book: Book) {
  const url = 'Books/';
  return this.httpClient.put(this.baseUrl + url + book.Id, book );
}



AddAuthorsToBook(book: Book) {
  const url = 'Books/AddAuthor/';
  return this.httpClient.put(this.baseUrl + url + book.Id, book );
}

RemoveAuthorOfBook(book: Book) {
  const url = 'Books/RemoveAuthorOfBook/';
  return this.httpClient.put(this.baseUrl + url + book.Id, book );
}

RemoveBookPhoto(book: Book) {
  const url = 'Books/RemovePhoto/';
  return this.httpClient.put(this.baseUrl + url + book.Id, book );
}

AddCategory(book: Book) {
  const url = 'Books/AddBookCategory/';
  return this.httpClient.put(this.baseUrl + url + book.Id, book );
}

RemoveCategory(book: Book) {
  const url = 'Books/RemoveCategory/';
  return this.httpClient.put(this.baseUrl + url + book.Id, book );
}

searchBookByISBN(ISBN: string): Observable<Book> {
  const url = 'Books/BookIsbn/';
  return this.httpClient.get<Book>(this.baseUrl + url + ISBN);
}

searchBookByTitle(Title: string): Observable<Book[]> {
  const url = 'Books/BookTitle/';
  return this.httpClient.get<Book[]>(this.baseUrl + url + Title);
}

searchBookByTitleForDisplay(Title: string, pageNumber?, pageSize?): Observable <PaginatedResult<Book[]>> {
  const url = 'Books/BookTitle/';
  const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult();
  const params = new HttpParams();

  if (pageNumber != null && pageSize != null) {
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
  }
  return this.httpClient.get<Book[]>(this.baseUrl + url + Title, {observe: 'response', params})
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

RemoveBook(book: Book) {
const url = 'Books/';
return this.httpClient.delete(this.baseUrl + url + book.Id); }
}
