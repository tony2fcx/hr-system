import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerOurTeamView {
  
  private http = inject(HttpClient)
  private baseUrl = '/api/auth'

  getOurTeamEmployee(){
    return this.http.get<any[]>(`${this.baseUrl}/my-employees`,{})
  }

}
