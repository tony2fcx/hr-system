import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService/authservice';

export const loginRedirectGuard: CanActivateFn = () => {
  

  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isLoggedIn()){

    const role = auth.getRole()?.toUpperCase();

    if(role === 'HR'){
      router.navigate(['dashboard/hr'], {replaceUrl:true})
    }
    else if(role === "MANAGER"){
      router.navigate(['/dashboard/manager'], {replaceUrl:true});
    }
    else if(role === "EMPLOYEE"){
      router.navigate(['/dashboard/employee'], {replaceUrl: true});
    }

    return false;
  }

  return true;
};
