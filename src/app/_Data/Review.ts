import { Reviewer } from './Reviewer';
import { Book } from './Book';

export class Review {
    ReviewId: number;
    Headline: string;
    ReviewText: string;
    Rating: number;
    ReviewerId: number;
    BookId: number;
    Reviewer?: Reviewer;
    Book?: Book;

}
