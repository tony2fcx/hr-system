import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HrAllattendanceview } from '../../../core/services/hr-allattendanceviews/hr-allattendanceview';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';

@Component({
  selector: 'app-attendance-view',
  imports: [CommonModule,RouterModule],
  templateUrl: './attendance-view.html',
  styleUrl: './attendance-view.css',
})
export class AttendanceView implements OnDestroy{

  private route = inject(ActivatedRoute);
  private attendanceService = inject(HrAllattendanceview)
  private router = inject(Router)
  private profileService = inject(HrProfileService);
      
  profile = this.profileService.profileSignal;

  attendanceList = signal<any[]>([]);
  selectedRole = signal<string>('all');
  isLoading = signal<boolean>(true)

  private intervalId :any;

  sidebarOpen = true;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  constructor(){
    const resolvedData = this.route.snapshot.data['attendanceData'];
    this.attendanceList.set(resolvedData);
    this.isLoading.set(false);
    this.profileService.loadProfile();

    this.intervalId = setInterval(()=>{
      this.refreshAttendance();
    },5000);
  }


  refreshAttendance(){
    this.attendanceService.getAllAttendances().subscribe({
      next:(data)=>{
        this.attendanceList.set(data);
      },
      error:(err)=>{
        console.error("Attendance refresh failed", err);
      }
    })
  }




  filteredAttendance = computed(() => {
    if(this.selectedRole() === 'all'){
      return this.attendanceList();
    }

    return this.attendanceList().filter(
      item => item.role?.toLowerCase() === this.selectedRole()
    )
  })


  onRoleChange(event:Event){
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRole.set(value);
  }



  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
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
 

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
