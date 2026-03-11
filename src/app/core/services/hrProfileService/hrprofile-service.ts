import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HrProfileService {
  
  private http = inject(HttpClient);
  private baseurl = '/api/auth'
  profileSignal = signal<any>(null);


  getOwnProfile(){
    return this.http.get(`${this.baseurl}/own-profiles`);
  }

  loadProfile(){
    this.getOwnProfile().subscribe(res =>{
      this.profileSignal.set(res);
    })
  }

  
  updateProfile(formData : FormData){
    return this.http.put(`${this.baseurl}/update-profile`, formData);
  }
}
