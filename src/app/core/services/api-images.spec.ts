import { TestBed } from '@angular/core/testing';

import { ApiImages } from './api-images';

describe('ApiImages', () => {
  let service: ApiImages;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiImages);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
