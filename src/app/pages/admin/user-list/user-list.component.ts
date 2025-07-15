import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CommonModule, MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private bookService: BookService) {}

  // ngOnInit(): void {
  //   const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

  //   this.users = allUsers
  //     .filter((user: any) => user.role === 'user')
  //     .map((user: any) => {
  //       const borrowed = JSON.parse(
  //         localStorage.getItem(`borrowed_${user.email}`) || '[]'
  //       );
  //       const returned = JSON.parse(
  //         localStorage.getItem(`returned_${user.email}`) || '[]'
  //       );
  //       return { ...user, borrowed, returned };
  //     });
  // }

  ngOnInit(): void {
    this.bookService.getAllUsersWithBorrows().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Failed to fetch users with borrowed books:', err);
      },
    });
  }
}
