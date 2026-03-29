import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotteryItems } from './pottery-items';

describe('PotteryItems', () => {
  let component: PotteryItems;
  let fixture: ComponentFixture<PotteryItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotteryItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotteryItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
