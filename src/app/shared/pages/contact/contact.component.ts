import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  showSearchAndNav: boolean = true;


  
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

  ngAfterViewInit(): void {
    this.adminService.isAdminPageOpen$.subscribe(isAdminPageOpen => {
      this.showSearchAndNav = !isAdminPageOpen;
    });
  }
}
