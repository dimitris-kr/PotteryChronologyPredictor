import { TestBed } from '@angular/core/testing';

import { ApiPotteryItems } from './api-pottery-items';

describe('ApiPotteryItems', () => {
  let service: ApiPotteryItems;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPotteryItems);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
