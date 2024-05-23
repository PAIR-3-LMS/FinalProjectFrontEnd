import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core'; // Dışarı tıklamaları dinlemek için

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './library-create.component.html',
  styleUrls: ['./library-create.component.scss']
})
export class LibraryCreateComponent implements OnInit {
generateCapitalizedName(): any {
throw new Error('Method not implemented.');
}
isPublicationDatePastOrPresent(): any {
throw new Error('Method not implemented.');
}
mustBeValidLength(): any {
throw new Error('Method not implemented.');
}
selectItem(_t93: any,arg1: string) {
throw new Error('Method not implemented.');
}
showLocationPanel: any;
filteredLocations: any;
hasError(arg0: string,arg1: string): any {
throw new Error('Method not implemented.');
}

  libraryAddForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private elementRef: ElementRef) {
    this.libraryAddForm = this.formBuilder.group({
      name:             new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      category:         new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      publicationDate:  new FormControl('', [Validators.required]),
      language:         new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      issn:             new FormControl('', [Validators.required]),
      locationId:       new FormControl('', [Validators.required]),
      description:      new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
      type:             new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      genre:            new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      totalPages:       new FormControl('', [Validators.required, Validators.min(1)]),
      publisherId:      new FormControl('', [Validators.required]),
      libraryId:        new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listenForOutsideClicks(); // Dışarı tıklamaları dinle
  }
  
  listenForOutsideClicks() {
    throw new Error('Method not implemented.');
  }

  submit(): void {
    if (this.libraryAddForm.invalid) {
      // Form geçersizse burada işlemler yapılabilir
      return;
    }
  // Metotlar ve diğer bileşen kodları buraya eklenecek

}
}