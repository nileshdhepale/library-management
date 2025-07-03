import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: any[] = [];

  constructor(private router: Router) {}

  register(user: any) {
    const existing = JSON.parse(localStorage.getItem('users') || '[]');
    existing.push(user);
    localStorage.setItem('users', JSON.stringify(existing));
  }

  login(email: string, password: string): any {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'user';
  }
}
