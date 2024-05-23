import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './library-update.component.html',
  styleUrls: ['./library-update.component.scss']
})
export class LibraryUpdateComponent implements OnInit {
generateCapitalizedName(): any {
throw new Error('Method not implemented.');
}
  libraryUpdateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeForm();
    this.listenForOutsideClicks(); // Dışarı tıklamaları dinle
  }

  initializeForm(): void {
    this.libraryUpdateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      publicationDate: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      issn: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
      type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      genre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      totalPages: new FormControl('', [Validators.required, Validators.min(1)]),
      publisherId: new FormControl('', [Validators.required]),
      libraryId: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]) // Örnek telefon numarası doğrulaması
    });
  }

  listenForOutsideClicks() {
    // Dışarı tıklamaları dinle
  }

  submit(): void {
    if (this.libraryUpdateForm.invalid) {
      // Form geçersizse burada işlemler yapılabilir
      return;
    }
    // Form geçerliyse burada işlemler yapılabilir
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.libraryUpdateForm.controls[controlName].hasError(errorName);
  }
}