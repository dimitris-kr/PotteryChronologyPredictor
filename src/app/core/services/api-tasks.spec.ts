import { TestBed } from '@angular/core/testing';

import { ApiTasks } from './api-tasks';

describe('ApiTasks', () => {
  let service: ApiTasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
