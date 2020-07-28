import { Review } from './Review';

export class Reviewer {
    ReviewerId: number;
    FirstName: string;
    LastName: string;
    UserName: string;
    UserId: number;
    ReviewsList?: Review[];

}
