import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './_Services/auth.service';
import { AuthGuard } from './_Guards/auth.guard';
import { AlertingService } from './_Services/alerting.service';
import { BooksServiceService } from './_Services/BooksService.service';
import { CategoryService } from './_Services/category.service';
import { AuthorsService } from './_Services/author.service';
import { ReviewService } from './_Services/review.service';
import { ReviewerServiceService } from './_Services/reviewerService.service';
import { detailedAuthorResolver } from './_Resolvers/detailedAuthor.resolver';
import { detailedBookResolver } from './_Resolvers/datailedBook.resolver';
import { detailedCategoryResolver } from './_Resolvers/detailedCategory.resolver';
import { booksListResolver } from './_Resolvers/bookList.resolver';
import { categoryListResolver } from './_Resolvers/categoryList.resolver';
import { authorListResolver } from './_Resolvers/authorList.resolver';
import { booksByAuthorResolver } from './_Resolvers/booksByAuthor.resolver';
import { booksInCategoryResolver } from './_Resolvers/booksInCategory.resolver';
import { reviewsListForBookResolver } from './_Resolvers/reviewsList.resolver';
import { reviewsListForReviewerResolver } from './_Resolvers/reviewsListForReviewer.resolver';
import { reviewerDetailsReolver } from './_Resolvers/reviewerDetails.resolver';
import { HttpClientModule } from '@angular/common/http';
// import { PreventUnsavedChanges } from './_Guards/prevent-unsaved-changes.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
    config: {
       tokenGetter,
       whitelistedDomains: ['localhost:5000', 'localhost:3000', 'localhost:44354'],
    }})
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertingService,
    BooksServiceService,
    CategoryService,
    AuthorsService,
    ReviewService,
    ReviewerServiceService,
    detailedAuthorResolver,
    detailedBookResolver,
    detailedCategoryResolver,
    booksListResolver,
    categoryListResolver,
    authorListResolver,
    booksByAuthorResolver,
    booksInCategoryResolver,
    reviewsListForBookResolver,
    reviewsListForReviewerResolver,
    reviewerDetailsReolver,
    // PreventUnsavedChanges,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
