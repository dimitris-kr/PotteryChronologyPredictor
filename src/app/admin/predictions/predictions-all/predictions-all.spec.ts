import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsAll } from './predictions-all';

describe('PredictionsAll', () => {
  let component: PredictionsAll;
  let fixture: ComponentFixture<PredictionsAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionsAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
