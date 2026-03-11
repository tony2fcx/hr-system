import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerAssignService {

  private http = inject(HttpClient);
  private baseUrl = '/api/auth'

  assignEmployees(data : {manager_id : number, employee_ids: number[]}){
    return this.http.post(`${this.baseUrl}/assign-employees`,data);
  }

  getAllTeams(){
    return this.http.get<any[]>(`${this.baseUrl}/hr/all-teams`)
  }
  

  deleteTeam(id:number){
    return this.http.put(`${this.baseUrl}/delete-team/${id}`,{})
  }


  deleteTeamEmployee(id:number){
    return this.http.put(`${this.baseUrl}/remove-employee/${id}`,{})
  }
  
}


