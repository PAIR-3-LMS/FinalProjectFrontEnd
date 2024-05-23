import { Injectable } from '@angular/core';
import { ItemQuery } from '../../features/item/models/itemQuery';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchKey!:string;
  itemList!: any[];
  private itemListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public itemList$: Observable<any[]> = this.itemListSubject.asObservable();

  constructor() { }

  setItemList(items: any ){
    this.itemListSubject.next(items)
  }

  getItemList(): Observable<any> {
    return this.itemList$;
  }

  setSearchKey(_searchKey: any){
    this.searchKey = _searchKey;
  }

  getSearchKey(){
    return this.searchKey;
  }
}
