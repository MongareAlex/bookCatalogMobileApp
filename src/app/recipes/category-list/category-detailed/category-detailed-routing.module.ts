import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDetailedPage } from './category-detailed.page';
import { detailedCategoryResolver } from 'src/app/_Resolvers/detailedCategory.resolver';
const routes: Routes = [
  {
    path: '',
    resolve: {bookDetailed: detailedCategoryResolver},
    component: CategoryDetailedPage

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryDetailedPageRoutingModule {}
