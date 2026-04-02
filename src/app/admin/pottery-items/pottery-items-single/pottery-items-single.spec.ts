import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotteryItemsSingle } from './pottery-items-single';

describe('PotteryItemsSingle', () => {
  let component: PotteryItemsSingle;
  let fixture: ComponentFixture<PotteryItemsSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotteryItemsSingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotteryItemsSingle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
