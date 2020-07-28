/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategotyService } from './category.service';

describe('Service: Categoty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategotyService]
    });
  });

  it('should ...', inject([CategotyService], (service: CategotyService) => {
    expect(service).toBeTruthy();
  }));
});
