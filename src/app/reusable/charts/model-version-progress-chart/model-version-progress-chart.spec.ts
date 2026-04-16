import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionProgressChart } from './model-version-progress-chart';

describe('ModelVersionProgressChart', () => {
  let component: ModelVersionProgressChart;
  let fixture: ComponentFixture<ModelVersionProgressChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelVersionProgressChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelVersionProgressChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
