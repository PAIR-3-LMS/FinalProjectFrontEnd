import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowCreateComponent } from './borrow-create.component';

describe('BorrowCreateComponent', () => {
  let component: BorrowCreateComponent;
  let fixture: ComponentFixture<BorrowCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});