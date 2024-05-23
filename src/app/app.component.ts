import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './shared/components/form/form.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ItemCreateComponent } from './features/item/pages/item-create/item-create.component';
import { ThemeService } from './shared/services/theme.service';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { AdminService } from './shared/services/admin.service';
import { AdminComponent } from './shared/pages/admin/admin.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';


// annotation, attribute, decorator
@Component({
  selector: 'app-root', // <app-root> <app-root/>
  standalone: true, // sonradan bakılacak.
  imports: [RouterOutlet, FormComponent, NavbarComponent, LoadingComponent, ItemCreateComponent,SearchbarComponent, CommonModule, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  showSearchAndNav!: boolean;


  constructor(private themeService: ThemeService,
              private adminService: AdminService,
              private changeDetectorRef: ChangeDetectorRef

            
            ) {            }


            ngAfterViewInit(): void {
              this.adminService.isAdminPageOpen$.subscribe(isAdminPageOpen => {
                this.showSearchAndNav = !isAdminPageOpen;
              });
            }

            
  toggleAdminPage() {
    this.adminService.adminServiceTrue(); // Admin sayfasını açmak için
    this.showSearchAndNav = false; // Searchbar ve Navbar'ı gizle
  }


  title = 'Tobeto';
  count = 0;
  inputValue: string = '';
  onBtnClick(event: Event) {
    console.log(this.inputValue);
    this.count++;
  }
  onChange(event: Event) {
    let element = event.target as HTMLInputElement;
    console.log('Input değeri değişti', element.value);
    this.inputValue = element.value;
  }

  isDarkMode() {
    return this.themeService.isDarkMode();
  }

  
}
