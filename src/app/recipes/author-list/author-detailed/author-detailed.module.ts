import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorDetailedPageRoutingModule } from './author-detailed-routing.module';

import { AuthorDetailedPage } from './author-detailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorDetailedPageRoutingModule
  ],
  declarations: [AuthorDetailedPage]
})
export class AuthorDetailedPageModule {}
