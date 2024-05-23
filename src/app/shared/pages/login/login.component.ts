import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginRequest } from '../../models/loginRequest';
import { jwtDecode } from 'jwt-decode';
import { NavbarComponent } from '../../components/navbar/navbar.component'; 
import { AuthorizationService } from '../../../core/services/authorization.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})


export class LoginComponent implements OnInit {

  showSearchAndNav: boolean = true;
  router = inject(Router);

  

  constructor(    
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private isAuth:AuthorizationService,
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  loginForm!: FormGroup;
  
//  token!: string;



  ngOnInit(): void {
    this.createFormGroup();
    this.adminService.adminServiceFalse();
    console.log(this.adminService.isAdminPageOpen$);
    this.changeDetectorRef.detectChanges();


  }

  ngAfterViewInit(): void {
    this.adminService.isAdminPageOpen$.subscribe(isAdminPageOpen => {
      this.showSearchAndNav = !isAdminPageOpen;
    });
  }

  createFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    })

    };
    

    submit() {
      this.loginForm.markAsDirty();
      if (this.loginForm.valid) {
        console.log('tıklandı')
        this.httpClient
        .post<LoginRequest>('http://localhost:60805/api/auth/login',this.loginForm.value).subscribe({
          next: (next) => {
            const objStr = JSON.stringify( next );
            const obj = JSON.parse (objStr);
            console.log('Backendden cevap geldi:', next);
         //   console.log(localStorage.getItem('token'));
            localStorage.setItem('token', obj['accessToken']['token'])
            this.isAuth.setIsAuth(obj['accessToken']);
            this.router.navigateByUrl('/homepage');

          },
          error: (error) => {
            console.log('Backendden hatalı cevap geldi:', error);
          },
          complete: () => {
            console.log('Backend isteği sonlandı.');
          
          },
          
        });
        console.log(this.loginForm.value);
        console.log('tıklandı')
        console.log(localStorage.getItem('token'));

     //   let decodedToken = jwtDecode(this.token)
       // console.log(decodedToken.aud)
      //  console.log(decodedToken.exp)
      //  console.log(decodedToken.iat)
      //  console.log(decodedToken.iss)
      console.log(localStorage.getItem('token'));

      }
    }  }


