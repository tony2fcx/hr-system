import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const roleGuard: CanActivateFn = (route) => {
  
  const router = inject(Router);

  const userRole = sessionStorage.getItem('role');

  const requiredRole = route.data['role'];

  if(!userRole || userRole.toLowerCase() !== requiredRole.toLowerCase()){
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
