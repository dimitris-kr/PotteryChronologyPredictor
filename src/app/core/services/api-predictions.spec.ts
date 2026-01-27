import { TestBed } from '@angular/core/testing';

import { ApiPredictions } from './api-predictions';

describe('ApiPredictions', () => {
  let service: ApiPredictions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPredictions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
