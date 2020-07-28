import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/_Data/Author';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from 'src/app/_Services/author.service';
import { Book } from 'src/app/_Data/Book';

@Component({
  selector: 'app-author-detailed',
  templateUrl: './author-detailed.component.html',
  styleUrls: ['./author-detailed.component.css']
})
export class AuthorDetailedComponent implements OnInit {
  author: Author;
  imageUrls?: string[];
  constructor(private route: ActivatedRoute, private authorService: AuthorsService) {

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

}
