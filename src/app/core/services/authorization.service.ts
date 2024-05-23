import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  authToken=localStorage.getItem('token');

  setIsAuth(isAuth:string){
    this.authToken = isAuth;
  }

  getIsAuth(){
    return localStorage.getItem('token')
  }

  deleteAuth(){
    localStorage.clear();
    this.authToken=localStorage.getItem('token');

  }
}
