import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_Data/Category';
import { CategoryService } from 'src/app/_Services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_Data/Book';

@Component({
  selector: 'app-category-detailed',
  templateUrl: './category-detailed.page.html',
  styleUrls: ['./category-detailed.page.scss'],
})
export class CategoryDetailedPage implements OnInit {
  category: Category;
  imageUrls?: string[];
   constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

   ngOnInit() {
     this.activatedRoute.data.subscribe(data => {
       this.category = data.categoryDetailed;
       this.imageUrls = [];
       this.category.CategoryIconImage.forEach(image => {
         if (image.ImageUrl != null) {
           this.imageUrls.push(image.ImageUrl);
         }
       });
       this.loadCategoryBooks();
     });

   }

 loadCategoryBooks() {
   this.categoryService.GetCategoryBooks(+this.activatedRoute.snapshot.params.id).subscribe(
     (books: Book[]) => {
       this.category.BooksList = books;
     }
   );
 }
 bookClick(){}
 loadData(event){}
 }
