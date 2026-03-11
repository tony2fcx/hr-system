import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Hrservice {
  
  private baseUrl = '/api/auth';
  private attentancebaseUrl = '/api/attendance';

  employees = signal<any[]>([]);
  managers = signal<any[]>([]);
  attendance = signal<any[]>([]);

  constructor(private http :HttpClient){}


  getEmployees(){
    return this.http.get<any[]>(`${this.baseUrl}/employees`)
  }


  getManagers(){
    return this.http.get<any[]>(`${this.baseUrl}/managers`)
   
  }

  getAttendance() {
    return this.http.get<any[]>(`${this.attentancebaseUrl}/hr/all`)
      
  }
  
  



  createEmployee(data:any){
    return this.http.post(`${this.baseUrl}/create-employee`,data);
  }


  createManager(data: any) {
    return this.http.post(`${this.baseUrl}/create-manager`, data);
  }


  assignManager(data: any) {
    return this.http.post(`${this.baseUrl}/assign-manager`, data);
  }



  deleteUser(id:number){
    return this.http.delete(`${this.baseUrl}/delete-user/${id}`);
  }

  
}
