import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeEnabled = false;


  constructor() { 
    this.loadTheme();
  }

  loadTheme() {
    this.darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    localStorage.setItem('darkModeEnabled', this.darkModeEnabled.toString());
  }

  isDarkMode() {
    return this.darkModeEnabled;
  }

  getModeSituation(){
    return this.darkModeEnabled
  }
}
