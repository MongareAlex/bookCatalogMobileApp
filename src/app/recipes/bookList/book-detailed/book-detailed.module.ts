import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailedPageRoutingModule } from './book-detailed-routing.module';

import { BookDetailedPage } from './book-detailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookDetailedPageRoutingModule
  ],
  declarations: [BookDetailedPage]
})
export class BookDetailedPageModule {}
