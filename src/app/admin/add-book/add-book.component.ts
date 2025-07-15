import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../services/book.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publishedDate: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {

      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (res) => {
          alert('Book added successfully!');
          this.bookForm.reset();
        },
        error: (err) => {
          console.error('❌ Error adding book:', err);
        },
      });
    }
  }
}
