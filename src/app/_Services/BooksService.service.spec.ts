/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BooksServiceService } from './BooksService.service';

describe('Service: BooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksServiceService]
    });
  });

  it('should ...', inject([BooksServiceService], (service: BooksServiceService) => {
    expect(service).toBeTruthy();
  }));
});
