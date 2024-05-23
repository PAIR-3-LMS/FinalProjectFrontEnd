import { Component } from '@angular/core';
import { AdminpanelComponent } from '../../../../shared/components/adminpanel/adminpanel.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../../../shared/services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [AdminpanelComponent,ReactiveFormsModule,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './item-delete.component.html',
  styleUrl: './item-delete.component.scss'
})
export class ItemDeleteComponent {



  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private adminService: AdminService,
  ) {}

  itemdeleteForm!: FormGroup;

  ngOnInit(): void {
    }


      itemDeleteId!:string;
  

    submit() {

        console.log('tıklandı')
        this.httpClient
        .delete<any>('http://localhost:60805/api/items/' + this.itemDeleteId).subscribe({
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
        console.log(this.itemdeleteForm.value);
        console.log('tıklandı')
      
    }


}
