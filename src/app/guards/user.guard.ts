import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  if (user?.role === 'user') {
    return true;
  }

  alert('Only users can access this page!');
  return router.createUrlTree(['/login']);
};
