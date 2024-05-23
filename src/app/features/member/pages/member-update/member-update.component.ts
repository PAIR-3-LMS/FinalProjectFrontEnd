import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss']
})
export class MemberUpdateComponent implements OnInit {
  memberUpdateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeForm();
    this.listenForOutsideClicks(); // Dışarı tıklamaları dinle
  }

  initializeForm(): void {
    this.memberUpdateForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      nationalId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]), // Ulusal Kimlik Numarası doğrulaması
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]), // Telefon numarası doğrulaması
      address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  listenForOutsideClicks() {
    // Dışarı tıklamaları dinle
  }

  submit(): void {
    if (this.memberUpdateForm.invalid) {
      // Form geçersizse burada işlemler yapılabilir
      return;
    }
    // Form geçerliyse burada işlemler yapılabilir
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.memberUpdateForm.controls[controlName].hasError(errorName);
  }
}