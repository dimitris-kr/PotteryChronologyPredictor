import { TestBed } from '@angular/core/testing';

import { ApiModels } from './api-models';

describe('ApiModels', () => {
  let service: ApiModels;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiModels);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
