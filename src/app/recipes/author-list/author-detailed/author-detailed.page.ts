import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/_Data/Author';
import { Book } from 'src/app/_Data/Book';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthorsService } from 'src/app/_Services/author.service';

@Component({
  selector: 'app-author-detailed',
  templateUrl: './author-detailed.page.html',
  styleUrls: ['./author-detailed.page.scss'],
})
export class AuthorDetailedPage implements OnInit {

  author: Author;
  imageUrls?: string[];
  constructor(private route: ActivatedRoute, private authorService: AuthorsService, private router: Router) {

   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.imageUrls = [];
      this.author = data.authorDetailed;
      this.author.AuthorImages.forEach(image => {
        if (image.ImageUrl != null) {
          this.imageUrls.push(image.ImageUrl);
        }
      });
    });
    this.loadAuthorBooks(+this.route.snapshot.params.id);
  }

  bookClick(){}
  loadAuthorBooks(id: number){
    this.authorService.GetAuthorBooks(id).subscribe(
      (books: Book[]) => {
        this.author.BooksList = books;
        console.log(this.author.BooksList);
      },
      (error): any => {
        console.error(error); }
     );
  }
  loadData(event){

  }

  viewGallery(){
    const navigationExtras: NavigationExtras = { state: { imageUrls: this.imageUrls } };
    this.router.navigate(['gallery'], navigationExtras);
  }

}
