import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsSingle } from './models-single';

describe('ModelsSingle', () => {
  let component: ModelsSingle;
  let fixture: ComponentFixture<ModelsSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsSingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsSingle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
