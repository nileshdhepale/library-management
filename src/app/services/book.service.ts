import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class BookService {
  private booksKey = 'books';
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {} // ✅ Inject HttpClient

  addBook(bookData: any) {
    console.log('📡 Sending to:', `${this.apiUrl}/books`);
    return this.http.post(`${this.apiUrl}/books`, bookData);
  }


  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  updateBook(bookId: string, updatedData: any) {
    return this.http.put(`${this.apiUrl}/books/${bookId}`, updatedData);
  }

  deleteBook(bookId: string) {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }

  clearBooks() {
    localStorage.removeItem(this.booksKey);
  }

  updateBooks(updatedBooks: any[]) {
    localStorage.setItem(this.booksKey, JSON.stringify(updatedBooks));
  }

  borrowBook(bookId: string, userId: string) {
    return this.http.post(`${this.apiUrl}/borrow`, {
      bookId,
      userId,
    });
  }

  getBorrowedBooks(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/borrow/${userId}`);
  }
  returnBook(borrowId: string) {
    return this.http.post(`${this.apiUrl}/borrow/return/${borrowId}`, {});
  }

   getAllUsersWithBorrows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/with-borrows`);
  }

}
