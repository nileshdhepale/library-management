import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserBookListComponent } from './user-book-list/user-book-list.component';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../auth/auth.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    UserBookListComponent,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    UserBookListComponent,
    MatDividerModule,
  ],
})
export class UserHomeComponent {
  constructor(private auth: AuthService) {}
  currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  logout() {
    this.auth.logout();
  }
}
