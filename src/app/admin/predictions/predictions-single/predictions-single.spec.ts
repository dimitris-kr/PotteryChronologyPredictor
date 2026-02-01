import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsSingle } from './predictions-single';

describe('PredictionsSingle', () => {
  let component: PredictionsSingle;
  let fixture: ComponentFixture<PredictionsSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsSingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionsSingle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
