import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/_Data/Category';
import { CategoryService } from 'src/app/_Services/category.service';
import { UserParams } from 'src/app/_Data/UserParams';
import { Pagination } from 'src/app/_Data/Pagination';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
categories: Category[];
SearchedCategoryName: string;
pagingDetails: Pagination = new Pagination();
searchedCategories: Category[];
userParams: UserParams = new UserParams();
@ViewChild(IonSearchbar) searchBar: IonSearchbar;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.userParams.PageNumber = 1;
    this.userParams.PageSize = 5;
    this.categoryService.GetCategories(this.userParams.PageNumber, this.userParams.PageSize).subscribe(
      (categoriesObject) => {
        this.categories = categoriesObject.result;
        this.searchedCategories = [];
        this.pagingDetails = categoriesObject.pagination;
      }
    );
  }
  searchCategories(){
    if (this.searchBar.value.trim() !== ''){
      this.categoryService.SearchCategoryForDisplay
      (this.searchBar.value, this.pagingDetails.CurentPage, this.pagingDetails.ItemsPerPage)
      .subscribe(
        (data) => {
           this.categories = [];
           this.pagingDetails = data.pagination;
           data.result.forEach(
            (category) => {
              this.searchedCategories.push(category);
            }
          );
           this.categories = [...this.searchedCategories];
        },
        (error) => {
          console.error(error);
        }
      );
    }


  }
  updateSearchParams(){
    this.searchedCategories = [];
  }
  loadCategories(event){
    if (this.pagingDetails.CurentPage !== this.pagingDetails.TotalPages){

      if (this.searchBar.value.trim() !== ''){
        this.searchCategories();
        event.target.complete();
        return;
      }
      this.categoryService.GetCategories(this.pagingDetails.CurentPage, this.pagingDetails.ItemsPerPage).subscribe(
      (categoriesObject) => {
        this.pagingDetails = categoriesObject.pagination;
        categoriesObject.result.forEach(
          (category) => {
            this.categories.push(category);
          }
        );
        console.log('completed');
        event.target.complete();
      });
      return;
      }
    event.target.disabled = true;
  }
}

