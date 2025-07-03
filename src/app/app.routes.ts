import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserHomeComponent } from './pages/user/user-home.component';
import { authGuard } from './guards/auth.guard';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { UserBookListComponent } from './pages/user/user-book-list/user-book-list.component';
import { UserBorrowedComponent } from './pages/user/user-borrowed/user-borrowed.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminBookListComponent } from './pages/admin/admin-book-list.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { EditProfileComponent } from './shared/edit-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/home',
    component: UserHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/add-book',
    component: AddBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/books',
    component: AdminBookListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/books',
    component: UserBookListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/borrowed',
    component: UserBorrowedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
];
