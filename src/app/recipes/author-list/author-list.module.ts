import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorListPageRoutingModule } from './author-list-routing.module';

import { AuthorListPage } from './author-list.page';
import { AuthorViewComponent } from './authorView/authorView.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorListPageRoutingModule
  ],
  declarations: [AuthorListPage, AuthorViewComponent]
})
export class AuthorListPageModule {}
