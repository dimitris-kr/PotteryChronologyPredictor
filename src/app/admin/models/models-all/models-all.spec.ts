import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsAll } from './models-all';

describe('ModelsAll', () => {
  let component: ModelsAll;
  let fixture: ComponentFixture<ModelsAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
