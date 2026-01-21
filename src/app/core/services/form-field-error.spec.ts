import { TestBed } from '@angular/core/testing';

import { FormFieldError } from './form-field-error';

describe('FormFieldError', () => {
  let service: FormFieldError;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldError);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
