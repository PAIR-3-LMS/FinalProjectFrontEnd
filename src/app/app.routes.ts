import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { SearchResponseComponent } from './shared/pages/search-response/search-response.component';
import { AdminComponent } from './shared/pages/admin/admin.component';
import { roleGuard } from './core/guards/role.guard';
import { ContactComponent } from './shared/pages/contact/contact.component';
import { ReservationCreateComponent } from './features/reservation/reservation-create/reservation-create.component';
import { ProfileComponent } from './shared/pages/profile/profile.component';
import { ItemDeleteComponent } from './features/item/pages/item-delete/item-delete.component';
import { ItemUpdateComponent } from './features/item/pages/item-update/item-update.component';
import { BorrowCreateComponent } from './features/borrow/pages/borrow-create/borrow-create.component';
import { BorrowDeleteComponent } from './features/borrow/pages/borrow-delete/borrow-delete.component';
import { ItemCreateComponent } from './features/item/pages/item-create/item-create.component';
import { ItemReadComponent } from './features/item/pages/item-read/item-read.component';
import { LibraryUpdateComponent } from './features/library/pages/library-update/library-update.component';
import { LibraryReadComponent } from './features/library/pages/library-read/library-read.component';
import { LibraryCreateComponent } from './features/library/pages/library-create/library-create.component';
import { MemberCreateComponent } from './features/member/pages/member-create/member-create.component';
import { MemberUpdateComponent } from './features/member/pages/member-update/member-update.component';


export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'searchresponse', component: SearchResponseComponent },
  { path: 'admin', component: AdminComponent,canActivate:[roleGuard],data: {requiredRoles: ['Admin']} },
  { path: 'iletisim', component: ContactComponent },
  { path: 'reservation', component: ReservationCreateComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/itemcreate', component: ItemCreateComponent },
  { path: 'admin/itemread', component: ItemReadComponent },
  { path: 'admin/libraryupdate', component: LibraryUpdateComponent },
  { path: 'admin/libraryread', component: LibraryReadComponent },
  { path: 'admin/librarycreate', component: LibraryCreateComponent },
  { path: 'admin/membercreate', component: MemberCreateComponent },
  { path: 'admin/memberupdate', component: MemberUpdateComponent },






  { path: 'admin/itemdelete', component: ItemDeleteComponent },
  { path: 'admin/itemupdate', component: ItemUpdateComponent },
  { path: 'admin/borrowcreate', component: BorrowCreateComponent },
  { path: 'admin/borrowdelete', component: BorrowDeleteComponent },




];
