import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef


  ) { }




  ngOnInit(): void {
    this.adminService.adminServiceTrue();
    console.log(this.adminService.isAdminPageOpen$)
    this.changeDetectorRef.detectChanges();
  }


  nngDoCheck():void	{

  }



}
