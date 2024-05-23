import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  showSearchAndNav!: boolean;



  constructor(
    private httpClient: HttpClient,
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef


  ) {}


  ngOnInit(): void {
    this.adminService.adminServiceFalse();
    console.log(this.adminService.isAdminPageOpen$);
    this.changeDetectorRef.detectChanges();


  }
}
