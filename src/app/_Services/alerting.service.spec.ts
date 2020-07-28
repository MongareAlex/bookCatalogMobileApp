/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertingService } from './alerting.service';

describe('Service: Alerting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertingService]
    });
  });

  it('should ...', inject([AlertingService], (service: AlertingService) => {
    expect(service).toBeTruthy();
  }));
});
