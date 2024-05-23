import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Library } from '../../models/libraryReadRequest';

@Component({
  selector: 'app-library-list',
  standalone: true,
  templateUrl: './library-read.component.html',
  styleUrls: ['./library-read.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class LibraryReadComponent implements OnInit {
  libraries: Library[] = [];
  filteredLibraries: Library[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getLibraries();
  }

  getLibraries(): void {
    this.http.get<{ items: any[] }>('http://localhost:60805/api/Libraries?PageIndex=0&PageSize=10')
      .pipe(
        map(response => response.items.map(library => ({
          name: library.name,
          address: library.address,
          phoneNumber: library.phoneNumber,
          city: library.city,
          website: library.website
        } as Library))),
        catchError(error => {
          console.error('Error fetching libraries:', error);
          return of([] as Library[]);
        })
      )
      .subscribe(data => {
        this.libraries = data;
        this.filteredLibraries = data;
      });
  }

  navigateToAddLibrary(): void {
    this.router.navigate(['/admin/libraryadd']);
  }

  updateLibrary(libraryName: string): void {
    this.router.navigate(['/update-library', libraryName]);
  }

  deleteLibrary(libraryName: string): void {
    this.http.delete(`http://localhost:60805/api/Libraries/${libraryName}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting library:', error);
          return of(null);
        })
      )
      .subscribe(() => {
        this.libraries = this.libraries.filter(library => library.name !== libraryName);
        this.filteredLibraries = this.filteredLibraries.filter(library => library.name !== libraryName);
      });
  }

  searchLibraries(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredLibraries = this.libraries.filter(library => 
      library.name.toLowerCase().includes(searchTermLower) ||
      library.address.toLowerCase().includes(searchTermLower) ||
      library.phoneNumber.toLowerCase().includes(searchTermLower) ||
      library.city.toLowerCase().includes(searchTermLower) ||
      library.website.toLowerCase().includes(searchTermLower)
    );
  }
}