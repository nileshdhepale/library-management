import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css'],
})
export class AdminBookListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  // ngOnInit(): void {
  //   this.books = this.bookService.getBooks();
  // }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books: any) => {
        this.books = books;
      },
      error: (err) => {
        console.error('Failed to fetch books:', err);
      },
    });
  }

  editBook(index: number) {
    const bookToEdit = this.books[index];
    const updatedTitle = prompt('Edit Title:', bookToEdit.title);
    const updatedAuthor = prompt('Edit Author:', bookToEdit.author);

    if (updatedTitle && updatedAuthor) {
      const updatedData = {
        ...bookToEdit,
        title: updatedTitle,
        author: updatedAuthor,
      };

      this.bookService.updateBook(bookToEdit._id, updatedData).subscribe({
        next: (updatedBook: any) => {
          this.books[index] = updatedBook; // Update UI with backend response
          alert('Book updated successfully!');
        },
        error: (err) => {
          console.error('Failed to update book:', err);
          alert('Something went wrong!');
        },
      });
    }
  }

  // deleteBook(index: number) {
  //   if (confirm('Are you sure you want to delete this book?')) {
  //     this.books.splice(index, 1);
  //     this.bookService.updateBooks(this.books);
  //   }
  // }

  deleteBook(index: number) {
    const bookId = this.books[index]._id;

    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.books.splice(index, 1); // Remove from UI
          alert('Book deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete book:', err);
          alert('Error deleting book.');
        },
      });
    }
  }
}
