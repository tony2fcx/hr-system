import { Component, inject, OnInit, signal } from '@angular/core';
import { ManagerOwnAttendance } from '../../../core/services/Manager-attendance/manager-own-attendance';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MgProfileService } from '../../../core/services/MgProfileService/mg-profile-service';

@Component({
  selector: 'app-mark-attendance',
  imports: [RouterModule,CommonModule],
  templateUrl: './mark-attendance.html',
  styleUrl: './mark-attendance.css',
})
export class MarkAttendance implements OnInit{


  private service = inject(ManagerOwnAttendance);
  private router = inject(Router);
  private profileService = inject(MgProfileService)

  loading = signal(false);
  message = signal('');
  status = signal('');
  checkInTime = signal<string | null>(null);
  checkOutTime = signal<string | null>(null);

  profile = this.profileService.profileSignal;

  sidebarOpen = false;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }



  ngOnInit(): void {
      this.loadAttendance();
      this.profileService.loadProfile();
  }


  loadAttendance(){

    this.service.getTodayAttendance().subscribe({

      next:(res:any)=>{

        if(res.check_in){
          this.checkInTime.set(
            new Date(res.check_in).toLocaleTimeString()
          )
        }

        if(res.check_out){
          this.checkOutTime.set(
            new Date(res.check_out).toLocaleTimeString()
          )
        }

        this.status.set(res.status)

      }

    })

  }




  checkIn(){

    this.loading.set(true);

    this.service.checkIn().subscribe({
      next:(res:any)=>{
        this.message.set(res.message);
        this.status.set(res.status)

        this.checkInTime.set(
          new Date(res.time).toLocaleTimeString()
        )

        this.loading.set(false)
      },

      error:(err)=>{
        this.message.set(err.error.detail);
        this.loading.set(false);
      }
    })
  }



  checkOut(){

    this.loading.set(true);

    this.service.checkOut().subscribe({

      next:(res:any)=>{
        this.message.set(res.message);
        this.status.set(res.status)

        this.checkOutTime.set(
          new Date(res.time).toLocaleTimeString()
        )

        this.loading.set(false)
      },

      error:(err)=>{
        this.message.set(err.error.detail);
        this.loading.set(false);
      }
    })
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
