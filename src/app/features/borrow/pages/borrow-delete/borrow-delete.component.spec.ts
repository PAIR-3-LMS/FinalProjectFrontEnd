import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowDeleteComponent } from './borrow-delete.component';

describe('BorrowDeleteComponent', () => {
  let component: BorrowDeleteComponent;
  let fixture: ComponentFixture<BorrowDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});