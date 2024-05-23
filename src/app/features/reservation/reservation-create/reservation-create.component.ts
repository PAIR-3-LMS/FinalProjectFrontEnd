import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../shared/services/admin.service';
import { ItemCreateComponent } from '../../item/pages/item-create/item-create.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component'; 

@Component({
  standalone: true,
  imports: [ItemCreateComponent,CommonModule,FormsModule, NavbarComponent,ReactiveFormsModule],
  templateUrl: './reservation-create.component.html',
  styleUrl: './reservation-create.component.scss'
})
export class ReservationCreateComponent {

  showSearchAndNav!: boolean;
  itemReservationFrom!:FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.createFormGroup();
    this.adminService.adminServiceFalse();
    console.log(this.adminService.isAdminPageOpen$);
    this.changeDetectorRef.detectChanges();
  }

    createFormGroup() {
      this.itemReservationFrom = this.formBuilder.group({
        memberId: new FormControl(),
        itemId: new FormControl(),
        reservationDate: new FormControl(),
      });
    }

    submit() {
      this.itemReservationFrom.markAsDirty();
      if (this.itemReservationFrom.valid) {
        console.log('tıklandı')
        this.httpClient
        .post<any>('http://localhost:60805/api/reservations',this.itemReservationFrom.value).subscribe({
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
        console.log(this.itemReservationFrom.value);
        console.log('tıklandı')
      }
    }
  }

