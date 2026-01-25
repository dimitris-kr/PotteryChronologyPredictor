import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsNew } from './predictions-new';

describe('PredictionsNew', () => {
  let component: PredictionsNew;
  let fixture: ComponentFixture<PredictionsNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionsNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
