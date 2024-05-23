import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemQuery } from '../../../features/item/models/itemQuery'; 
import { SearchService } from '../../services/search.service'; 
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../../core/services/authorization.service'; 
import { ThemeService } from '../../services/theme.service';
import  "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule, HttpClientModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{

  itemList!: null;
  navbarSearchKey:string='';
  dropDownString='book';
  selectedLng!:string;
  dynamicSearchRequest = {
   /* "sort": [
      {
        "field": "name",
        "dir": "asc"
      }
    ],*/
    "filter": {
    "field": "name",
    "operator": "contains",
    "value": "şeker",
    "logic": "and",
    "filters": [ ]
  }}

  isAuthCheck=localStorage.getItem('token');



  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private searchService: SearchService,
    private isAuth:AuthorizationService,
    private themeService: ThemeService,
    private translateservis:TranslateService,

  ) {}

   
  
    ngOnInit(): void {
      this.selectedLng = this.translateservis.defaultLang
    }

    changeLanguage(){

      this.translateservis.use(this.selectedLng);
    }

  getItems() {
    this.httpClient.get<any>(
      'http://localhost:60805/api/Items'
    ).subscribe({
      next: (response: any) => {
        console.log('Backendden cevap geldi:', response);
        this.itemList = response;
      },
      error: (error) => {
        console.log('Backendden hatalı cevap geldi:', error);
      },
      complete: () => {
        console.log('Backend isteği sonlandı.');
      },
    });
    }



    postDynamicItems() {
      this.itemList = null;
      this.httpClient.post<any>(
        'http://localhost:60805/api/Items/dynamic?PageIndex=0&PageSize=1',this.dynamicSearchRequest
      ).subscribe({
        next: (response: any) => {
          console.log('Backendden cevap geldi:', response);
          this.itemList = response;
          console.log(this.dynamicSearchRequest);

        },
        error: (error) => {
          console.log('Backendden hatalı cevap geldi:', error);
          console.log(this.dynamicSearchRequest);

        },
        complete: () => {
          console.log('Backend isteği sonlandı.');
          console.log(this.dynamicSearchRequest);

        },
      });
      }

    makeASearch(){
      this.searchService.setSearchKey(this.navbarSearchKey);
      console.log('makeASearch çalışltı')
      console.log(this.searchService.getSearchKey())
    }

    logOut(){
      this.isAuth.deleteAuth();
      localStorage.clear();
      this.isAuthCheck = localStorage.getItem('token')
    }

    toggleDarkMode() {
      this.themeService.toggleDarkMode();
    }
   
    setDropDown(){
      this.dropDownString = 'Option1';
    }
    setDropDown2(){
      this.dropDownString = 'Option2';
    }
    setDropDown3(){
      this.dropDownString = 'Option3';
    }
    }






