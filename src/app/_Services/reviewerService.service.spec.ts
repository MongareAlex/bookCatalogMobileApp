/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReviewerServiceService } from './reviewerService.service';

describe('Service: ReviewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewerServiceService]
    });
  });

  it('should ...', inject([ReviewerServiceService], (service: ReviewerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
