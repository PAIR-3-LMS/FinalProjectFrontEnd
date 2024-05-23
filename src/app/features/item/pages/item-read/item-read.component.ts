import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-read.component.html',
  styleUrls: ['./item-read.component.scss'],
  imports: [CommonModule, RouterModule]  // Burada CommonModule'u ve RouterModule ekleyin
})
export class ItemReadComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] | undefined;
  searchTerm: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.http.get<{ items: any[] }>('http://localhost:60805/api/Items?PageIndex=0&PageSize=10')
      .pipe(
        map(response => response.items.map(item => ({
          id: item.id,
          name: item.name,
          isbn: item.isbn,
          type: item.type,
          language: item.language,
        }))),
        catchError(error => {
          console.error('Error fetching items:', error);
          return of([]); // Hata durumunda boş bir array döndür
        })
      )
      .subscribe(data => {
        this.items = data;
      });
  }



  updateItem(itemId: string): void {
    this.router.navigate(['/admin/itemupdate', itemId]);
  }
  


  async deleteItem(itemId: string): Promise<void> {
    try {
      console.log(`Deleting item with ID: ${itemId}`);
      await firstValueFrom(
        this.http
          .delete(`http://localhost:60805/api/Items/${itemId}`)
          .pipe(
            map(() => itemId), // Başarılı silme işleminden sonra item ID'yi geri döndür
            catchError(error => {
              console.error('Öğe silinirken bir hata oluştu:', error);
              throw new Error('Öğe silinirken bir hata oluştu'); // Hata durumunda hata fırlat
            })
          )
      );
      console.log('Öğe başarıyla silindi:', itemId);
      // Silme işlemi başarılı olduğunda gerekli işlemleri burada gerçekleştirin
      this.items = this.items.filter(item => item.id !== itemId);
    } catch (error) {
      console.error('Silme işlemi sırasında bir hata oluştu:', error);
      // Hata durumunda gerekli işlemleri burada gerçekleştirin
    }
  }


  searchItems(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.name.toLowerCase().includes(searchTermLower) ||
      item.isbn.toLowerCase().includes(searchTermLower) ||
      item.type.toLowerCase().includes(searchTermLower) ||
      item.language.toLowerCase().includes(searchTermLower)
    );
  }
}