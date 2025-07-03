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

  constructor(private bookService: BookService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser?.email) {
      this.borrowedBooks = this.bookService.getBorrowedBooks(this.currentUser.email);
    }
  }

  returnBook(book: any) {
    this.bookService.returnBook(book, this.currentUser.email);
    alert('Book returned successfully!');
    this.ngOnInit();
  }
}
