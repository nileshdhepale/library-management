import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {
  private booksKey = 'books';

  addBook(book: any) {
    const books = JSON.parse(localStorage.getItem(this.booksKey) || '[]');
    books.push(book);
    localStorage.setItem(this.booksKey, JSON.stringify(books));
  }

  getBooks() {
    return JSON.parse(localStorage.getItem(this.booksKey) || '[]');
  }

  clearBooks() {
    localStorage.removeItem(this.booksKey);
  }

  updateBooks(updatedBooks: any[]) {
    localStorage.setItem(this.booksKey, JSON.stringify(updatedBooks));
  }

  borrowBook(book: any, email: string) {
    const books = this.getBooks();
    const index = books.findIndex((b: { title: string }) => b.title === book.title);
    if (index !== -1 && books[index].quantity > 0) {
      books[index].quantity--;
      localStorage.setItem(this.booksKey, JSON.stringify(books));

      const userBorrowKey = `borrowed_${email}`;
      const borrowed = JSON.parse(localStorage.getItem(userBorrowKey) || '[]');
      borrowed.push({ ...book, date: new Date() });
      localStorage.setItem(userBorrowKey, JSON.stringify(borrowed));
    }
  }

  getBorrowedBooks(email: string) {
    const userBorrowKey = `borrowed_${email}`;
    return JSON.parse(localStorage.getItem(userBorrowKey) || '[]');
  }
 
  returnBook(book: any, email: string) {
  // Update quantity in books
  const books = this.getBooks();
  const index = books.findIndex((b: { title: string }) => b.title === book.title);
  if (index !== -1) {
    books[index].quantity++;
    localStorage.setItem(this.booksKey, JSON.stringify(books));
  }

  // Remove one matching entry from user's borrowed list
  const userBorrowKey = `borrowed_${email}`;
  const borrowed = JSON.parse(localStorage.getItem(userBorrowKey) || '[]');

  const removeIndex = borrowed.findIndex((b: any) => b.title === book.title);
  if (removeIndex !== -1) {
    const returnedBook = borrowed[removeIndex];
    returnedBook.returnedOn = new Date(); // Add return date
    borrowed.splice(removeIndex, 1);
    localStorage.setItem(userBorrowKey, JSON.stringify(borrowed));

    // Add to returned books
    const returnKey = `returned_${email}`;
    const returned = JSON.parse(localStorage.getItem(returnKey) || '[]');
    returned.push(returnedBook);
    localStorage.setItem(returnKey, JSON.stringify(returned));
  }
}

}
