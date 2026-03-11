import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ManagerService } from '../../../core/services/manager-dashboard/manager-service';
import { CommonModule } from '@angular/common';
import { MgProfileService } from '../../../core/services/MgProfileService/mg-profile-service';

Chart.register(...registerables)
@Component({
  selector: 'app-manager-dashboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css',
})
export class ManagerDashboard {

  private route = inject(ActivatedRoute);
  private service = inject(ManagerService)
  private router = inject(Router)
  private profileService = inject(MgProfileService)


  tasks = signal<any[]>([]);
  attendance = signal<any[]>([]);
  employees = signal<any[]>([]);
  

  totalEmployees = signal(0);
  presentCount = signal(0);
  absentCount = signal(0);
  attendancePercentage = signal(0)
  pendingCount = signal(0)
  completedCount = signal(0)

  profile = this.profileService.profileSignal;

  constructor(){

    const data = this.route.snapshot.data['dashboardData'];

    this.tasks.set(data.tasks);
    this.attendance.set(data.attendance);
    this.employees.set(data.employees);

    this.totalEmployees.set(data.employees.length);

    const present = data.attendance.filter((a:any)=>a.status === 'Present').length;
    const absent = data.attendance.filter((a:any)=>a.status === 'Absent').length;

    this.presentCount.set(present);
    this.absentCount.set(absent);

    this.profileService.loadProfile();


    const percentage = (present / data.employees.length) * 100
    this.attendancePercentage.set(Math.round(percentage))



    const pending = data.tasks.filter((t:any)=>t.status === 'PENDING').length
    const completed = data.tasks.filter((t:any)=>t.status === 'COMPLETED').length

    this.pendingCount.set(pending)
    this.completedCount.set(completed)





    setTimeout(()=>{

      
      const taskCtx:any = document.getElementById('taskChart')

      new Chart(taskCtx,{
        type:'doughnut',

        data:{
          labels:['Pending','Completed'],
          datasets:[{
            data:[
              this.pendingCount(),
              this.completedCount()
            ],
            backgroundColor:[
              '#ff0707',
              '#198754'
            ]
          }]
        },

        options:{
          responsive:true,
          plugins:{
            legend:{
              position:'bottom',
            }
          }
        }

      })


      
      const attendanceCtx:any = document.getElementById('attendanceChart')

      new Chart(attendanceCtx,{

        type:'line',

        data:{
          labels:['Attendance'],   

          datasets:[
            {
              label:'Present',
              data:[this.presentCount()],
              borderColor:'#198754',
              backgroundColor:'#198754',
              tension:0.4,
              fill:false
            },

            {
              label:'Absent',
              data:[this.absentCount()],
              borderColor:'#dc3545',
              backgroundColor:'#dc3545',
              tension:0.4,
              fill:false
            }
          ]
        },

        options:{
          responsive:true,
          plugins:{
            legend:{
              position:'bottom'
            }
          },
          scales:{
            y:{
              beginAtZero:true
            }
          }
        }

      })

    })
  }





  sidebarOpen = false;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }



  logout(){
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
    }
}
