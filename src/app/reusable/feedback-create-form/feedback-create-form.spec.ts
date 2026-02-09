import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCreateForm } from './feedback-create-form';

describe('FeedbackCreateForm', () => {
  let component: FeedbackCreateForm;
  let fixture: ComponentFixture<FeedbackCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackCreateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackCreateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
