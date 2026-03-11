import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HrAllattendanceview {
  

  private baseUrl = '/api/attendance';
  private http = inject(HttpClient);


  getAllAttendances(){
    return this.http.get<any[]>(`${this.baseUrl}/hr/all`);
  }
  
}
