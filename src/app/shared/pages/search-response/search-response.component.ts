import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemQuery } from '../../../features/item/models/itemQuery';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { AdminService } from '../../services/admin.service';
import { ThemeService } from '../../services/theme.service';
import { SearchService } from '../../services/search.service';
import { Observable } from 'rxjs';


@Component({
  standalone: true,
  imports: [CommonModule,HttpClientModule,NavbarComponent,SearchbarComponent],
  templateUrl: './search-response.component.html',
  styleUrl: './search-response.component.scss'
})
export class SearchResponseComponent implements OnInit
{
  itemList$!: Observable<any[]>;

  showSearchAndNav!: boolean;
  isModeDark = this.themeService.getModeSituation();


  constructor(    
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef,
    private httpClient:HttpClient,
    private themeService:ThemeService,
    private searchService:SearchService,
  ){ }

  ngOnInit(): void {

    this.adminService.adminServiceFalse();
    console.log(this.adminService.isAdminPageOpen$);
    this.changeDetectorRef.markForCheck();
    this.itemList$ = this.searchService.getItemList();
}



}
