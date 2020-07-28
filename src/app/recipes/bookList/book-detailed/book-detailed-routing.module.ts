import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailedPage } from './book-detailed.page';
import { detailedBookResolver } from 'src/app/_Resolvers/datailedBook.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookDetailedPage,
    resolve: {bookDetailed: detailedBookResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDetailedPageRoutingModule {}
