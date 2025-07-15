import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    this.profileForm = this.fb.group({
      name: [this.currentUser.name],
      email: [this.currentUser.email],
      password: [this.currentUser.password],
    });
  }

  // onSubmit() {
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   const index = users.findIndex(
  //     (u: any) => u.email === this.currentUser.email
  //   );

  //   if (index !== -1) {
  //     users[index] = {
  //       ...users[index],
  //       ...this.profileForm.value,
  //     };
  //     localStorage.setItem('users', JSON.stringify(users));
  //     localStorage.setItem('currentUser', JSON.stringify(users[index]));
  //     alert('Profile updated successfully!');
  //     this.router.navigate(['/']); // redirect based on role if needed
  //   }
  // }

  onSubmit() {
  this.authService
    .updateProfile(this.currentUser.id, this.profileForm.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        alert('Profile updated successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update profile!');
      },
    });
}

}
