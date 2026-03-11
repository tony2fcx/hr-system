import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ManagerOurTeamView } from '../../../core/services/ManagerOurTeamView/manager-our-team-view';
import { MgProfileService } from '../../../core/services/MgProfileService/mg-profile-service';



@Component({
  selector: 'app-our-team-view',
  imports: [RouterModule,CommonModule],
  templateUrl: './our-team-view.html',
  styleUrl: './our-team-view.css',
})

export class OurTeamView {


  private route = inject(ActivatedRoute);
  private managerOurTeamService = inject(ManagerOurTeamView);
  private router = inject(Router);
  private profileService = inject(MgProfileService)

  employees = signal<any[]>([]);
  selectedEmployee = signal<any|null>(null);

  profile = this.profileService.profileSignal;


  sidebarOpen = false;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }



  constructor(){
    const data = this.route.snapshot.data['managerOurTeamEmployeesData'] ?? [];
    this.employees.set(data);
    this.profileService.loadProfile();
  }



  viewTeamEmployee(employee:any){
    this.selectedEmployee.set(employee);
  }



  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
