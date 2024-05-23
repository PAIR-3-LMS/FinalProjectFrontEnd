import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Item } from '../../models/item';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit {
submit() {
throw new Error('Method not implemented.');
}
  itemForm!: FormGroup;
  itemId!: string;
  locations: string[] = ['Salim'];
  publishers: string[] = ['Salim'];
  library: string[] = ['Salim'];
  filteredLocations = this.locations;
  filteredPublishers = this.publishers;
  filteredLibrary = this.library;
  showLocationPanel: boolean = false;
  selectedLocation: string | undefined;
  showPublisherPanel: boolean = false;
  selectedPublisher: string | undefined;
  showLibraryPanel: boolean = false;
  selectedLibrary: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {
    this.itemForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      isbn: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      genre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      publicationDate: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      totalPages: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5000)]),
      publisherId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      libraryId: new FormControl('', [Validators.required]),
      inStock: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    this.getItemDetails(this.itemId);
    this.listenForOutsideClicks();
  }

  getItemDetails(id: string): void {
    this.http.get<Item>(`http://localhost:60805/api/Items/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching item details:', error);
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.itemForm.patchValue(data);
        }
      });
  }

  hasError(errorCode: string, field: string) {
    const control = this.itemForm.get(field);
    return (
      (control?.dirty || control?.touched) && control?.hasError(errorCode)
    );
  }

  generateCapitalizedName() {
    const name = this.itemForm.get('name')?.value;
    return name && name.length > 0 && name[0] === name[0].toLowerCase();
  }

  isPublicationDatePastOrPresent() {
    const publicationDate = this.itemForm.get('publicationDate')?.value;
    if (publicationDate) {
      const selectedDate = new Date(publicationDate);
      const currentDate = new Date();
      return selectedDate >= currentDate;
    }
    return false;
  }

  mustBeValidLength() {
    const isbn = this.itemForm.get('isbn')?.value;
    if (isbn.length === 8 || isbn.length === 10 || isbn.length === 13) {
      return false;
    } else {
      return (this.itemForm.get('isbn')?.dirty || this.itemForm.get('isbn')?.touched);
    }
  }

  private closePanels(): void {
    this.showLocationPanel = false;
    this.showPublisherPanel = false;
    this.showLibraryPanel = false;
  }

  private listenForOutsideClicks(): void {
    document.addEventListener('click', (event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.closePanels();
      }
    });
  }

  togglePanel(panelName: string): void {
    if (panelName === 'location') {
      this.showLocationPanel = !this.showLocationPanel;
      if (this.showLocationPanel) {
        this.showPublisherPanel = false;
        this.showLibraryPanel = false;
      }
    } else if (panelName === 'publisher') {
      this.showPublisherPanel = !this.showPublisherPanel;
      if (this.showPublisherPanel) {
        this.showLocationPanel = false;
        this.showLibraryPanel = false;
      }
    } else if (panelName === 'library') {
      this.showLibraryPanel = !this.showLibraryPanel;
      if (this.showLibraryPanel) {
        this.showPublisherPanel = false;
        this.showLocationPanel = false;
      }
    }
  }

  filterItems(event: Event, type: string) {
    let inputElement = event.target as HTMLInputElement;
    let searchTerm = inputElement.value.toLowerCase().trim();
    let items = type === 'locations' ? this.locations : this.publishers;
    let filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));

    if (type === 'locations') {
      this.filteredLocations = filteredItems;
    } else if (type === 'publishers') {
      this.filteredPublishers = filteredItems;
    } else if (type === 'library') {
      this.filteredLibrary = filteredItems;
    }
  }

  selectItem(selection: string, type: 'location' | 'publisher' | 'library') {
    if (type === 'location') {
      this.selectedLocation = selection;
      this.itemForm.patchValue({ locationId: selection });
    } else if (type === 'publisher') {
      this.selectedPublisher = selection;
      this.itemForm.patchValue({ publisherId: selection });
    } else if (type === 'library') {
      this.selectedLibrary = selection;
      this.itemForm.patchValue({ libraryId: selection });
    }
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    if (this.itemForm.valid) {
      this.http.put(`http://localhost:60805/api/Items/${this.itemId}`, this.itemForm.value)
        .pipe(
          catchError(error => {
            console.error('Error updating item:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/items']);
        });
    }
  }
}
