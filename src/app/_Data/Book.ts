import { Review } from './Review';
import { Category } from './Category';
import { Author } from './Author';
import { BookImage } from './BookImage';

export class Book {
    Id: number;
    ISBN: string;
    AverageRating: number;
    NumberOfAuthors: number;
    NumberOfReviews: number;
    Synopsis: string;
    IsPrint: boolean;
    MainPhotoId: number;
    Categories: Category[];
    Authors: Author[];
    ImageList: BookImage[];
    Title: string;
    DatePublished: Date;
    CategoryList?: any;
    AuthorList?: any;
    ReviewsList?: Review[];
    bookImages: BookImage[];
}
