import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService/authservice';

export const authGuard: CanActivateFn = () => {
  
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isLoggedIn()){
    return true;
  }else{
    router.navigate(['/auth/login']);
    return false;
  }

};
