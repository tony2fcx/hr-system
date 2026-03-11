import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  

  private baseUrl = '/api/tasks';
  private attendanceBaseUrl = '/api/attendance'
  private employeeUrl = '/api/auth'

  task = signal<any[]>([]);
  attendance = signal<any[]>([]);
  employees = signal<any[]>([])


  constructor(private http:HttpClient){}


  getTasks(){
    return this.http.get<any[]>(`${this.baseUrl}/view`)
  }


  createTask(data:any){
    return this.http.post(`${this.baseUrl}/create`,data)
  }


  updateTask(id:number,data:any){
    return this.http.put(`${this.baseUrl}/update/${id}`,data);
  }


  deleteTask(id:number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }


  getTeamAttendance(){
    return this.http.get<any[]>(`${this.attendanceBaseUrl}/manager/team`)
  }


  getEmployees(){
    return this.http.get<any[]>(`${this.employeeUrl}/my-employees`);
  }
  

  
}
