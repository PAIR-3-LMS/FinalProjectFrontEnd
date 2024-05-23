import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToDo } from '../../models/toDo';
import { FilterTodolistPipe } from '../../pipes/filter-todolist.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ItemQuery } from '../../../features/item/models/itemQuery';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AdminService } from '../../services/admin.service';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { LoginComponent } from '../login/login.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, FilterTodolistPipe, FormsModule,HttpClientModule,NavbarComponent,SearchbarComponent,LoginComponent,TranslateModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  itemList: ItemQuery[] = [];
  searchKey: string = '';
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

  ngAfterViewInit(): void {
    this.adminService.isAdminPageOpen$.subscribe(isAdminPageOpen => {
      this.showSearchAndNav = !isAdminPageOpen;
    });
  }








}
