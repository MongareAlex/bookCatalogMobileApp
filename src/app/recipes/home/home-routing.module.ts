import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
      path: 'books',
      children: [{
        path: '',
        loadChildren: () => import('../bookList/bookList.module').then( m => m.BookListModule)
      },
     ]
    },
    {
      path: 'authors',
      children: [{
        path: '',
        loadChildren: () => import('../author-list/author-list.module').then( m => m.AuthorListPageModule)
      }]

    },
    {
      path: 'categories',
      children: [{
        path: '',
        loadChildren: () => import('../category-list/category-list.module').then( m => m.CategoryListPageModule)
      }]

    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
