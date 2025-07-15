import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private baseUrl = 'http://localhost:5000/api/auth';
  private apiUrl = environment.baseUrl;

  constructor(private router: Router, private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  updateProfile(userId: string, userData: any) {
    return this.http.put<any>(`${this.apiUrl}/auth/update/${userId}`, userData);
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
