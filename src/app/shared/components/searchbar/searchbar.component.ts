import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ItemQuery } from '../../../features/item/models/itemQuery';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,RouterModule,TranslateModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {


  router = inject(Router);


  searchValue:string='';
  searchField:string='name';

  dynamicSearchRequest: any;

   constructor(
    private httpClient: HttpClient,
    private searchService: SearchService,
    private changeDetectorRef:ChangeDetectorRef,

  ) {
    this.changeDetectorRef.markForCheck();

  }


  onFieldSelect(event: any) {
    this.searchField = event.target.value; // Seçilen seçeneği değişkene ata
  }


    searchDynamic() {
      this.dynamicSearchRequest = {
        "filter": {
          "field": this.searchField,
          "operator": "contains",
          "value": this.searchValue,
          "logic": "and",
          "filters": []
        }
      };
      this.httpClient.post<any[]>(
        'http://localhost:60805/api/Items/dynamic?PageIndex=0&PageSize=10',this.dynamicSearchRequest
      ).subscribe({
        next: (response) => {
          console.log('Backendden cevap geldi:', response);
          const objStr = JSON.stringify( response );
          const obj = JSON.parse (objStr);
          this.searchService.setItemList(obj['items']);
          console.log(this.searchService.getItemList());
          this.router.navigate(['/searchresponse']);
          this.changeDetectorRef.detectChanges();
          

  
        },
        error: (error) => {
          console.log('Backendden hatalı cevap geldi:', error);
          console.log(this.dynamicSearchRequest,this.searchValue);
          this.router.navigate(['/searchresponse']);
  
        },
        complete: () => {
          console.log('Backend isteği sonlandı.');
          console.log(this.dynamicSearchRequest,this.searchValue);
          this.router.navigate(['/searchresponse']);
  
        },
      });
      }

}
