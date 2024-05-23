import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginRequest } from '../../models/loginRequest';
import { registerRequest } from '../../models/registerRequest';
import { UserForRegisterDto } from '../../models/userForRegisterDto';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthorizationService } from '../../../core/services/authorization.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {

  showSearchAndNav!: boolean;
  router = inject(Router);



  constructor(    
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private isAuth:AuthorizationService,
) {}

  registerForm!: FormGroup;
  forUserForm!:FormGroup;
  


  ngOnInit(): void {

    this.createFormGroup();
    this.adminService.adminServiceFalse();
    console.log(this.adminService.isAdminPageOpen$);
    this.changeDetectorRef.detectChanges();
  }

  createFormGroup() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      phoneNumber: new FormControl(),
      address: new FormControl(),
    })
    
    };

    submit() {
      this.registerForm.markAsDirty();
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        let formValue = this.registerForm.value;
  
        let submitValue = {
          userForRegisterDto: {
            email: formValue.email,
            password: formValue.password,
          },
          ...formValue.name,
          ...formValue.password,

        };
        console.log(this.registerForm.value);
        this.httpClient
          .post('http://localhost:60805/api/auth/register', this.registerForm.value)
          .subscribe({
            next: (next) => {
              const objStr = JSON.stringify( next );
              const obj = JSON.parse (objStr);
              console.log('Backendden cevap geldi:', next);
              localStorage.setItem('token', obj['token'])
              console.log(localStorage.getItem('token'));
              this.isAuth.setIsAuth(obj['token']);
              this.router.navigateByUrl('/homepage');


            },
            error: (error) => {
              console.log('Backendden hatalı cevap geldi:', error);
            },
            complete: () => {
              console.log('Backend isteği sonlandı.');
            },
            
          });
      }
    } }


