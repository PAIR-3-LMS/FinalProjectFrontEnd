import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminpanelComponent } from '../../../../shared/components/adminpanel/adminpanel.component';

@Component({
  selector: 'app-borrow-delete',
  standalone: true,
  imports: [CommonModule,FormsModule,AdminpanelComponent,ReactiveFormsModule],
  templateUrl: './borrow-delete.component.html',
  styleUrl: './borrow-delete.component.scss'
})
export class BorrowDeleteComponent {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private changeDetectorRef: ChangeDetectorRef

  ) {}

    borrowDeleteForm!: FormGroup;

    ngOnInit(): void {
      this.deleteBorrowGroup();
      this.changeDetectorRef.detectChanges();
  
    }

  deleteBorrowGroup() {
    this.borrowDeleteForm = this.formBuilder.group({
      borrowId: new FormControl(),
      memberId: new FormControl(),
      fineType: new FormControl(),
      description: new FormControl(),
    });
  }

  submit() {
    this.borrowDeleteForm.markAsDirty();
    if (this.borrowDeleteForm.valid) {
      console.log('tıklandı')
      this.httpClient
      .delete<any>('http://localhost:60805/api/borrows',this.borrowDeleteForm.value).subscribe({
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
      console.log(this.borrowDeleteForm.value);
    }
  }

}