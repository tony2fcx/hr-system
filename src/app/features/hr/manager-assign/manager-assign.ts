import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ManagerAssignService } from '../../../core/services/hr-manager-teamassign/manager-assign-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-assign',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './manager-assign.html',
  styleUrl: './manager-assign.css',
})
export class ManagerAssign {


  private service = inject(ManagerAssignService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profileService = inject(HrProfileService);
    
  

  managers = signal<any[]>([]);
  employees = signal<any[]>([]);
  selectedManager = signal<number|null>(null);
  selectedEmployees = signal<number[]>([])
  message = signal<string>("")
  teams = signal<any[]>([]);


  profile = this.profileService.profileSignal;

  sidebarOpen = true;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  constructor(){

    const data = this.route.snapshot.data

    this.managers.set(data['managerslistsData'])
    this.employees.set(data['employeeslistsData'])
    this.teams.set(data['teamsData']);
    this.profileService.loadProfile();
  }

  onManagerChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    this.selectedManager.set(value ? +value : null);
  }


  toggleEmployee(id:number){

    const current = this.selectedEmployees();

    if(current.includes(id)){
      this.selectedEmployees.set(current.filter(e => e !== id));
    }
    else{
      this.selectedEmployees.set([...current, id]);
    }
  }


  loadTeams(){
    this.service.getAllTeams().subscribe(res => {
      this.teams.set(res);
    })
  }



  assign(){

    if(!this.selectedManager() ||this.selectedEmployees().length === 0){
      this.message.set("Please select manager & employees");
      this.selectedEmployees.set([])
      return;
    }


    const payload = {
      manager_id: this.selectedManager()!,
      employee_ids: this.selectedEmployees()
    };



    this.service.assignEmployees(payload).subscribe({
      
      next:()=>{
        this.message.set("Employees assigned successfully...")
        this.selectedEmployees.set([]);
        this.selectedManager.set(null);
        this.loadTeams()

        setTimeout(()=>{
        this.message.set("");
        },3000)
      },

      error:()=>{
        this.message.set("Assigned failed...");
      }
    })
  }


  deleteTeam(id:number){
    this.service.deleteTeam(id).subscribe({
      next:()=>{
        this.message.set("Team deleted successfully...");
        this.loadTeams();
      },

      error:()=>{
        this.message.set('Team delete failed..')
      }
    })
  }


    deleteTeamEmployee(id:number){

    this.service.deleteTeamEmployee(id).subscribe({
      next:()=>{
        this.message.set("Employee removed from team");
        this.loadTeams();
      },

      error:()=>{
        this.message.set("Employee remove failed");
      }
    })
  }




  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
