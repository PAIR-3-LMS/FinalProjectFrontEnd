import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDeleteComponent } from './member-delete.component';

describe('MemberDeleteComponent', () => {
  let component: MemberDeleteComponent;
  let fixture: ComponentFixture<MemberDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
