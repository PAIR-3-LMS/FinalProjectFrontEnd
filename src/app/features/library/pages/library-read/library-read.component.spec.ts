import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryReadComponent } from './library-read.component';

describe('LibraryReadComponent', () => {
  let component: LibraryReadComponent;
  let fixture: ComponentFixture<LibraryReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
