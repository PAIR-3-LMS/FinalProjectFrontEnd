import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private isAdminPageOpenSubject = new BehaviorSubject<boolean>(false);
  isAdminPageOpen$ = this.isAdminPageOpenSubject.asObservable();

  constructor() { }

  adminServiceTrue() {
    this.isAdminPageOpenSubject.next(true);
  }

  adminServiceFalse() {
    this.isAdminPageOpenSubject.next(false);
  }
}
