import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MgViewTaskService {

  private baseUrl = '/api/tasks'
  
  tasks = signal<any[]>([])

  constructor(private http: HttpClient){}


  getTasks(){
    return this.http.get<any[]>(`${this.baseUrl}/view`)
  }


  createTask(data:any){
    return this.http.post(`${this.baseUrl}/create`,data)
  }

  deleteTask(id:number){
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`)
  }


  updateTask(id:number, data:any){
    return this.http.put(`${this.baseUrl}/update/${id}`,data)
  }
}
 