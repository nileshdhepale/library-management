import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    // if (this.loginForm.valid) {
    //   this.authService.login(this.loginForm.value).subscribe({
    //     next: (res: any) => {
    //       localStorage.setItem('token', res.token);
    //       localStorage.setItem('user', JSON.stringify(res.user));
    //       this.router.navigate(['/dashboard']);
    //     },
    //     error: (err) => {
    //       alert(err.error.message || 'Login failed');
    //     }
    //   });
    // }

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));

          alert(`Logged in as ${res.user.role}`);

          if (res.user.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/user/home']);
          }
        },
        error: (err) => {
          alert(err.error.message || 'Login failed');
        },
      });
    }

    // if (this.loginForm.valid) {
    //   const { email, password } = this.loginForm.value;
    //   const users = JSON.parse(localStorage.getItem('users') || '[]');

    //   const user = users.find(
    //     (u: any) => u.email === email && u.password === password
    //   );

    //   if (user) {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     alert(`Logged in as ${user.role}`);

    //     if (user.role === 'admin') {
    //       this.router.navigate(['/admin/dashboard']);
    //     } else {
    //       this.router.navigate(['/user/home']);
    //     }
    //   } else {
    //     alert('Invalid email or password');
    //   }
    // }
  }
}
