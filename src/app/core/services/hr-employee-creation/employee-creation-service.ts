import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeCreationService {
  

  private http = inject(HttpClient);
  private baseUrl = '/api/auth';


  register(formData : FormData, role:string){

    if(role === 'hr'){
      return this.http.post(`${this.baseUrl}/register`,formData);
    }

    if(role === 'manager'){
      return this.http.post(`${this.baseUrl}/create-manager`,formData);
    }

    return this.http.post(`${this.baseUrl}/create-employee`, formData);
  }

}


