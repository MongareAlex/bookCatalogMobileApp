import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorDetailedPage } from './author-detailed.page';
import { detailedAuthorResolver } from 'src/app/_Resolvers/detailedAuthor.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthorDetailedPage,
    resolve: {authorDetailed: detailedAuthorResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorDetailedPageRoutingModule {}
