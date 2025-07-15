import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-borrowed',
  standalone: true,
  templateUrl: './user-borrowed.component.html',
  styleUrl: './user-borrowed.component.css',
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class UserBorrowedComponent implements OnInit {
  borrowedBooks: any[] = [];
  currentUser: any;

  constructor(
    private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser?.id) {
      this.bookService.getBorrowedBooks(this.currentUser.id).subscribe({
        next: (data: any) => {
          this.borrowedBooks = data;
        },
        error: (err) => {
          console.error('Failed to fetch borrowed books', err);
          this.borrowedBooks = [];
        },
      });
    }
  }


  returnBook(borrow: any) {
    console.log('borrow', borrow);
    this.bookService.returnBook(borrow._id).subscribe({
      next: () => {
        alert('✅ Book returned successfully!');
        this.ngOnInit();
      },
      error: (err) => {
        console.error('❌ Return failed', err);
        alert('Failed to return book');
      },
    });
  }
}
