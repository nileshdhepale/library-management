// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../auth.service'; // ✅ Adjust path as needed

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          alert('Registered successfully');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error.message === 'Email already exists') {
            alert(
              'This email is already registered. Please use a different one.'
            );
          } else {
            alert('Registration failed');
          }
        },
      });
    }

    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // const formData = this.registerForm.value;

    // const emailExists = users.some(
    //   (user: any) => user.email === formData.email
    // );
    // if (emailExists) {
    //   alert('A user with this email already exists.');
    //   return;
    // }

    // users.push(formData);
    // localStorage.setItem('users', JSON.stringify(users));
    // alert('Registered successfully!');
    // this.router.navigate(['/login']);
  }
}
