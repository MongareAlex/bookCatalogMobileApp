import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListPage } from './author-list.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorListPage
  },
  {
    path: ':id',
    loadChildren: () => import('./author-detailed/author-detailed.module').then( m => m.AuthorDetailedPageModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorListPageRoutingModule {}
