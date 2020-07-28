import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './bookList.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: ':bookId',
    loadChildren: () => import('./book-detailed/book-detailed.module').then( m => m.BookDetailedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksListRoutingModule {}
