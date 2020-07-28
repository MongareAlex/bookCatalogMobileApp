import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from 'src/app/_Data/Author';
import { Pagination } from 'src/app/_Data/Pagination';
import { UserParams } from 'src/app/_Data/UserParams';
import { IonSearchbar } from '@ionic/angular';
import { AuthorsService } from 'src/app/_Services/author.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.page.html',
  styleUrls: ['./author-list.page.scss'],
})
export class AuthorListPage implements OnInit {
authors: Author[];
pagingDetails: Pagination = new Pagination();
pagingDetailsSearch: Pagination = new Pagination();
searchedAuthors: Author[];
pageParams: UserParams = {PageNumber: 1, PageSize: 5};
pageParamsSearch: UserParams = {PageNumber: 1, PageSize: 5};
imageUrls?: string[];
searchMode = false;
@ViewChild(IonSearchbar) searchBar: IonSearchbar;
  constructor(private authorService: AuthorsService, private router: Router) {
   }

  ngOnInit() {
    this.pageParams.PageNumber = 1;
    this.pageParams.PageSize = 5;
    this.authorService.GetAuthors(this.pageParams.PageNumber, this.pageParams.PageSize).subscribe(
      (authorsObject) => {
        this.authors = authorsObject.result;
        this.searchedAuthors = [];
        this.pagingDetails = authorsObject.pagination;
      }
    );
  }
  searchAuthors(event){
    this.searchMode = true;
    if (this.searchBar.value.trim() !== ''){
      if (this.pageParams.PageNumber !== this.pagingDetails.TotalPages){
      this.authorService.searchAuthors
      (this.searchBar.value, this.pageParamsSearch.PageNumber, this.pageParamsSearch.PageSize)
      .subscribe(
        (data) => {
           this.authors = [];
           this.pagingDetailsSearch = data.pagination;
           data.result.forEach(
            (author) => {
              this.searchedAuthors.push(author);
            }
          );
           this.authors = [...this.searchedAuthors];
        },
        (error) => {
          console.error(error);
        }
      );
    }
      event.target.disabled = true;
  }

  }

  loadAuthors(event){

      if (this.searchMode){
        this.pageParamsSearch.PageNumber = this.pageParamsSearch.PageNumber + 1;
        this.searchAuthors(event);
        event.target.complete();
        return;
      }
      else{
        if (this.pageParams.PageNumber !== this.pagingDetails.TotalPages) {
      this.pageParams.PageNumber = this.pageParams.PageNumber + 1;

      this.authorService.GetAuthors(this.pageParams.PageNumber, this.pageParams.PageSize).subscribe(
      (authorsObject) => {
        this.pagingDetails = authorsObject.pagination;
        authorsObject.result.forEach(
          (author) => {
            this.authors.push(author);
          }
        );
        console.log('completed');
        event.target.complete();
      });
      return;
    }
        event.target.disabled = true; }
    }

  updateSearchParams(){
    this.searchedAuthors = [];
  }
  }
