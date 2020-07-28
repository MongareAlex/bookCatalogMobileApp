import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryDetailedPageRoutingModule } from './category-detailed-routing.module';

import { CategoryDetailedPage } from './category-detailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryDetailedPageRoutingModule
  ],
  declarations: [CategoryDetailedPage]
})
export class CategoryDetailedPageModule {}
