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

  // ngOnInit() {
  //   this.books = this.bookService.getBooks();
  //   this.currentUser = this.authService.getCurrentUser();
  //   this.borrowedBooks = this.bookService.getBorrowedBooks(
  //     this.currentUser.email
  //   );
  // }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.bookService.getBooks().subscribe({
      next: (books: any[]) => {
        this.books = books;

        // Fetch borrowed books from backend after user is known
        console.log('bhai', this.currentUser);
        if (this.currentUser?.id) {
          this.bookService.getBorrowedBooks(this.currentUser.id).subscribe({
            next: (borrowed: any[]) => {
              this.borrowedBooks = borrowed;
            },
            error: (err) => {
              console.error('Failed to fetch borrowed books:', err);
              this.borrowedBooks = [];
            },
          });
        }
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
      },
    });
  }

  // borrowBook(book: any) {
  //   if (book.quantity > 0) {
  //     this.bookService.borrowBook(book, this.currentUser.email);
  //     alert('Book borrowed successfully!');
  //     this.ngOnInit(); // refresh data
  //   } else {
  //     alert('No copies available to borrow.');
  //   }
  // }

  borrowBook(book: any) {
    if (book.quantity > 0) {
      const userId = this.authService.getCurrentUser().id; // 👈 make sure _id exists
      console.log('userId', userId, this.authService.getCurrentUser());
      this.bookService.borrowBook(book._id, userId).subscribe({
        next: (res) => {
          alert('Book borrowed successfully!');
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to borrow book');
        },
      });
    } else {
      alert('No copies available to borrow.');
    }
  }
}
