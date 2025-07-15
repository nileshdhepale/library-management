import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('currentUser');

    console.log('currentUser', currentUser);
    if (currentUser) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
