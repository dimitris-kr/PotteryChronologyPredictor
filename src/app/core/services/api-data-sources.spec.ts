import { TestBed } from '@angular/core/testing';

import { ApiDataSources } from './api-data-sources';

describe('ApiDataSources', () => {
  let service: ApiDataSources;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDataSources);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
