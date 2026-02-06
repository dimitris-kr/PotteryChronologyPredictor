import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionBreakdownChart } from './regression-breakdown-chart';

describe('RegressionBreakdownChart', () => {
  let component: RegressionBreakdownChart;
  let fixture: ComponentFixture<RegressionBreakdownChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegressionBreakdownChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegressionBreakdownChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
