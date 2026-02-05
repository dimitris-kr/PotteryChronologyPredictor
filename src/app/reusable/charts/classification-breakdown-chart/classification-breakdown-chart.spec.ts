import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationBreakdownChart } from './classification-breakdown-chart';

describe('ClassificationBreakdownChart', () => {
  let component: ClassificationBreakdownChart;
  let fixture: ComponentFixture<ClassificationBreakdownChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationBreakdownChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationBreakdownChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
