import { Country } from './Country';
import { Book } from './Book';
import { AuthorPhoto } from './AuthorPhoto';

export class Author {
    AuthorId: number;
    FirstName: string;
    LastName: string;
    Bio: string;
    CountryId: number;
    MainAuthorImageId: number;
    AuthorImages: AuthorPhoto[];
    BooksList?: Book[];
    Country?: Country;
}
