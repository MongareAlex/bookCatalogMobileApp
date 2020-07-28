import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksServiceService } from 'src/app/_Services/BooksService.service';
import { Book } from 'src/app/_Data/Book';
import { Pagination } from 'src/app/_Data/Pagination';
import { IonSearchbar } from '@ionic/angular';
import { UserParams } from 'src/app/_Data/UserParams';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-bookList',
  templateUrl: './bookList.component.html',
  styleUrls: ['./bookList.component.css']
})
export class BookListComponent implements OnInit {
books?: Book[];
pagingDetails: Pagination = new Pagination();
searchedBooks?: Book[];
userParams: UserParams = new UserParams();
@ViewChild(IonSearchbar) searchBar: IonSearchbar;
  constructor(private bookService: BooksServiceService) { }

  ngOnInit() {
    this.userParams.PageNumber = 1;
    this.userParams.PageSize = 5;
    this.bookService.GetBooks(this.userParams.PageNumber, this.userParams.PageSize).subscribe(
      (booksObject) => {
        this.books = booksObject.result;
        this.searchedBooks = [];
        this.pagingDetails = booksObject.pagination;
      }
    );
  }

  loadBooks(event){
    if (this.pagingDetails.CurentPage !== this.pagingDetails.TotalPages){

    if (this.searchBar.value.trim() !== ''){
      this.searchBooks();
      event.target.complete();
      return;
    }
    this.bookService.GetBooks(this.pagingDetails.CurentPage, this.pagingDetails.ItemsPerPage).subscribe(
    (booksObject) => {
      this.pagingDetails = booksObject.pagination;
      booksObject.result.forEach(
        (book) => {
          this.books.push(book);
        }
      );
      console.log('completed');
      event.target.complete();
    });
    return;
    }
    event.target.disabled = true;

  }

  searchBooks(){
    console.log(this.searchedBooks);
    console.log(this.books);
    console.log(this.pagingDetails);
    if (this.searchBar.value.trim() !== ''){
      this.bookService.searchBookByTitleForDisplay
      (this.searchBar.value, this.pagingDetails.CurentPage, this.pagingDetails.ItemsPerPage)
      .subscribe(
        (data) => {
           this.books = [];
           this.pagingDetails = data.pagination;
           data.result.forEach(
            (book) => {
              this.searchedBooks.push(book);
            }
          );
           this.books = [...this.searchedBooks];
           console.log(this.searchedBooks);
           console.log(this.books);
           console.log(this.searchBar.value.trim());
        },
        (error) => {
          console.error(error);
        }
      );
    }

  }

  updateSearchParams(){
    console.log('ionchange event raised');
    this.searchedBooks = [];
  }
}
