import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const http = inject(HttpClient)

  let accessToken = sessionStorage.getItem('access_token');
  let refreshToken = sessionStorage.getItem('refresh_token')

  const baseUrl = 'http://localhost:8000'


  if(req.url.includes('/auth/refresh')){
    return next(req);
  }



  const isTokenExpiringSoon = ()=>{

    if(!accessToken) return false;

    try{

      const decode:any = jwtDecode(accessToken);
      const expTime = decode.exp * 1000;
      const currentTime = Date.now();

      const twoMinutes = 2*60*1000;

      return(expTime - currentTime) <= twoMinutes;
    }
    catch{
      return false;
    }
  };


  const refreshAccessToken = ()=>{

    return http.post<any>(`${baseUrl}/auth/refresh`, {
      refresh_token : refreshToken
    }).pipe(
      switchMap(response => {
        sessionStorage.setItem('access_token',response.access_token);
        sessionStorage.setItem('refresh_token',response.refresh_token);

        accessToken = response.access_token;

        const newReq = req.clone({
          setHeaders:{
            Authorization :`Bearer ${response.access_token}`
          }
        });

        return next(newReq);
      })
    )
  };



  if(accessToken && refreshToken && isTokenExpiringSoon()){
    return refreshAccessToken().pipe(
      catchError(()=>{
        localStorage.clear();
        router.navigate(['/auth/login']);
        return throwError(()=> new Error('Session Expired'))
      })
    );
  }




  let clonedReq = req;

  if (accessToken) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && refreshToken) {
        return refreshAccessToken();
      }

      return throwError(() => error);
    })
  );
};