import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerTeamAttendance {
  
  private baseUrl = '/api/attendance';
  private http = inject(HttpClient);


  getMyTeamAllAttendances(){
    return this.http.get<any[]>(`${this.baseUrl}/manager/team`);
  }
}