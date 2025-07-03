import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-book-list',
  standalone: true,
  templateUrl: './user-book-list.component.html',
  styleUrl: './user-book-list.component.css',
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class UserBookListComponent implements OnInit {
  books: any[] = [];
  borrowedBooks: any[] = [];
  currentUser: any;

  constructor(
    private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.books = this.bookService.getBooks();
    this.currentUser = this.authService.getCurrentUser();
    this.borrowedBooks = this.bookService.getBorrowedBooks(
      this.currentUser.email
    );
  }

  borrowBook(book: any) {
    if (book.quantity > 0) {
      this.bookService.borrowBook(book, this.currentUser.email);
      alert('Book borrowed successfully!');
      this.ngOnInit(); // refresh data
    } else {
      alert('No copies available to borrow.');
    }
  }
}
