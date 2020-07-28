import { Book } from './Book';
import { CategoryIconImage } from './categoryIconImage';

export class Category {
    CategoryId: number;
    CategoyName: string;
    BooksList?: Book[];
    CategoryIconImageId: number;
    MainCategoryIconImage: CategoryIconImage;
    CategoryIconImage: CategoryIconImage[];
}
