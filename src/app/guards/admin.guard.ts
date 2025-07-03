// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  if (user?.role === 'admin') {
    return true;
  }

  alert('Only admins can access this page!');
  return router.createUrlTree(['/login']);
};
