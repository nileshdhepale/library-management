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

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  editBook(index: number) {
    const bookToEdit = this.books[index];
    const updatedTitle = prompt('Edit Title:', bookToEdit.title);
    const updatedAuthor = prompt('Edit Author:', bookToEdit.author);

    if (updatedTitle && updatedAuthor) {
      this.books[index].title = updatedTitle;
      this.books[index].author = updatedAuthor;
      this.bookService.updateBooks(this.books);
    }
  }

  deleteBook(index: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.books.splice(index, 1);
      this.bookService.updateBooks(this.books);
    }
  }
}
