import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminpanelComponent } from '../../../../shared/components/adminpanel/adminpanel.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule,AdminpanelComponent,ReactiveFormsModule],
  templateUrl: './borrow-create.component.html',
  styleUrl: './borrow-create.component.scss'
})
export class BorrowCreateComponent {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private changeDetectorRef: ChangeDetectorRef

  ) {}

    borrowCreateForm!: FormGroup;

    ngOnInit(): void {
      this.createBorrowGroup();
      this.changeDetectorRef.detectChanges();
  
    }

  createBorrowGroup() {
    this.borrowCreateForm = this.formBuilder.group({
      itemId: new FormControl(),
      memberId: new FormControl(),
    });
  }

  submit() {
    this.borrowCreateForm.markAsDirty();
    if (this.borrowCreateForm.valid) {
      console.log('tıklandı')
      this.httpClient
      .post<any>('http://localhost:60805/api/borrows',this.borrowCreateForm.value).subscribe({
        next: (next) => {
          console.log('Backendden cevap geldi:', next);
        },
        error: (error) => {
          console.log('Backendden hatalı cevap geldi:', error);
        },
        complete: () => {
          console.log('Backend isteği sonlandı.');
        },
      });
      console.log(this.borrowCreateForm.value);
      console.log('tıklandı')
    }
  }

}