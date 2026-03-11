import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManagerTeamAttendance } from '../../../core/services/ManagerTeamAttentance/manager-team-attentance';
import { MgProfileService } from '../../../core/services/MgProfileService/mg-profile-service';


@Component({
  selector: 'app-team-attendance',
  imports: [RouterModule, CommonModule,],
  templateUrl: './team-attendance.html',
  styleUrl: './team-attendance.css',
})
export class TeamAttendance implements OnDestroy, OnInit{

  private profileService = inject(MgProfileService)
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private attendanceService = inject(ManagerTeamAttendance)


  attendanceList = signal<any[]>([])
  isLoading = signal<boolean>(true)

  profile = this.profileService.profileSignal;
  sidebarOpen = false;


  private refreshInterval :any


  constructor(){
    const data = this.route.snapshot.data['managerTeamAttendanceData'];
    this.attendanceList.set(data);
    this.isLoading.set(false);
    this.profileService.loadProfile();
  }



  ngOnInit(): void {
      
    this.refreshInterval = setInterval(()=>{
      this.attendanceService.getMyTeamAllAttendances().subscribe(
        data =>{
          this.attendanceList.set(data)
        }
      )
    },2000)
  }


  ngOnDestroy(): void {
    if(this.refreshInterval){
      clearInterval(this.refreshInterval);
    }
  }

  

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }



  formatTime(time:string|null){

    if(!time) return '—';

    const date = new Date(time);

    return date.toLocaleTimeString([],{
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    })
  }
}
