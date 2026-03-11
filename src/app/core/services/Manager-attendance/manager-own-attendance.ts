import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerOwnAttendance {
  
  private http = inject(HttpClient);
  private baseUrl = '/api/attendance'


  attendanceStatus = signal<any>(null);

  checkIn(){
    return this.http.post(`${this.baseUrl}/check-in`,{});
  }


  checkOut(){
    return this.http.post(`${this.baseUrl}/check-out`,{})
  }

  
  getTodayAttendance(){
    return this.http.get(`${this.baseUrl}/today`);
  }
}
