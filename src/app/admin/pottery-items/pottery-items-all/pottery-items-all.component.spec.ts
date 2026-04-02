import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotteryItemsAll } from './pottery-items-all.component';

describe('PotteryItems', () => {
  let component: PotteryItemsAll;
  let fixture: ComponentFixture<PotteryItemsAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotteryItemsAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotteryItemsAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
