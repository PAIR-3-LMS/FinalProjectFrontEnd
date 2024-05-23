import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { AddItemRequest } from '../../models/addItemRequest';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.scss'
})
export class ItemCreateComponent implements OnInit {

  itemaddForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private elementRef: ElementRef) {
    this.itemaddForm = this.formBuilder.group({
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

  hasError(errorCode: string, field: string) {
    const control = this.itemaddForm.get(field);
    return (control?.dirty || control?.touched) && control?.hasError(errorCode);
  }

  generateCapitalizedName() {
    const name = this.itemaddForm.get('name')?.value;
    return name && name.length > 0 && name[0] === name[0].toLowerCase();
  }

  isPublicationDatePastOrPresent() {
    const publicationDate = this.itemaddForm.get('publicationDate')?.value;
    if (publicationDate) {
      const selectedDate = new Date(publicationDate);
      const currentDate = new Date();
      return selectedDate >= currentDate;
    }
    return false;
  }

  mustBeValidLength() {
    const isbn = this.itemaddForm.get('isbn')?.value;
    return isbn.length === 8 || isbn.length === 10 || isbn.length === 13;
  }

  ngOnInit(): void {
    this.listenForOutsideClicks();
  }

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
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase().trim();
    const items = type === 'locations' ? this.locations : type === 'publishers' ? this.publishers : this.library;
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));

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
      this.itemaddForm.patchValue({ locationId: selection });
    } else if (type === 'publisher') {
      this.selectedPublisher = selection;
      this.itemaddForm.patchValue({ publisherId: selection });
    } else if (type === 'library') {
      this.selectedLibrary = selection;
      this.itemaddForm.patchValue({ libraryId: selection });
    }
  }

  submit() {
    if (this.itemaddForm.invalid) {
      this.itemaddForm.markAllAsTouched();
      return;
    }

    const addItemRequest: AddItemRequest = this.itemaddForm.value as AddItemRequest;

    this.httpClient.post<AddItemRequest>('http://localhost:60805/api/items', addItemRequest)
      .subscribe({
        next: (response) => {
          console.log('Backendden cevap geldi:', response);
        },
        error: (error) => {
          console.error('Backendden hatalı cevap geldi:', error);
          if (error.status === 400) {
            console.error('Hata detayları:', error.error);
          }
        },
        complete: () => {
          console.log('Backend isteği sonlandı.');
        },
      });
  }
}
