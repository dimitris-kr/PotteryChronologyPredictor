import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackConnectForm } from './feedback-connect-form';

describe('FeedbackConnectForm', () => {
  let component: FeedbackConnectForm;
  let fixture: ComponentFixture<FeedbackConnectForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackConnectForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackConnectForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
