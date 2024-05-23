import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReadComponent } from './item-read.component';

describe('ItemsGetComponent', () => {
  let component: ItemReadComponent;
  let fixture: ComponentFixture<ItemReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
