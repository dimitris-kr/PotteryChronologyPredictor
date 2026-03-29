import { TestBed } from '@angular/core/testing';

import { ApiHistoricalPeriods } from './api-historical-periods';

describe('ApiHistoricalPeriods', () => {
  let service: ApiHistoricalPeriods;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHistoricalPeriods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
