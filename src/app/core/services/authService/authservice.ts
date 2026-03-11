import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private baseUrl = '/api/auth';


  currentUser = signal<any|null>(null);

  constructor(
    private http:HttpClient,
    private router:Router
  ){}


  login(data: any){
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }



  saveTokens(access:string, refresh:string){
    sessionStorage.setItem('access_token',access)
    sessionStorage.setItem('refresh_token',refresh)
  }



  setRole(role:string){
    this.currentUser.set(role);
    sessionStorage.setItem('role',role);
  }


  getRole(){
    return sessionStorage.getItem('role')
  }


  logout(){
    sessionStorage.clear()
    this.currentUser.set(null)
    this.router.navigate(['/auth/login']);
  }



  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('access_token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;

    if (Date.now() > expiry) {
      this.logout();
      return false;
    }

    return true;
  }

}
