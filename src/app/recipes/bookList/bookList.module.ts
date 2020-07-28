import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './bookList.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BooksListRoutingModule } from './booksList-routing.module';
import { BookVIewComponent } from './bookVIew/bookVIew.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksListRoutingModule
  ],
  declarations: [BookListComponent, BookVIewComponent]
})
export class BookListModule { }
