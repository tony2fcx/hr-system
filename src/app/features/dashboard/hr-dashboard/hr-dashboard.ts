import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Hrservice } from '../../../core/services/hr-dashboard/hrservice';
import { interval } from 'rxjs';
import { Chart, registerables } from 'chart.js';

import { CommonModule } from '@angular/common';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';

Chart.register(...registerables)


@Component({
  selector: 'app-hr-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './hr-dashboard.html',
  styleUrl: './hr-dashboard.css',
})
export class HrDashboard implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private hrService = inject(Hrservice);
  private staffChart:any;
  private attendanceChart :any;
  private router = inject(Router)
  private profileService = inject(HrProfileService);
  
  profile = this.profileService.profileSignal;


  employees = signal<any[]>([]);
  managers = signal<any[]>([]);
  attendance = signal<any[]>([]);


  constructor(){
    const resolvedData = this.route.snapshot.data['hrDashBoardData'];

    this.employees.set(resolvedData.employees);
    this.managers.set(resolvedData.managers);
    this.attendance.set(resolvedData.attendance ?? []);
    this.profileService.loadProfile();
  }


  toggleSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('open');
  }


  createStaffChart(){
    const ctx:any = document.getElementById('staffChart');

    this.staffChart = new Chart(ctx, {
      type :'doughnut',
      data:{
        labels : ['Managers','Employees'],
        datasets :[{
          data:[
            this.managers().length,
            this.employees().length
          ],
          backgroundColor:['#ffc107','#0d6efd'],
          borderWidth:2
        }]
      },

      options:{
        responsive:true,
        maintainAspectRatio:false,
        animation:{
          animateScale: true,
          animateRotate: true,
        },
        plugins:{
          legend:{
            position :'top'
          }
        }
      }
    });
  }





  createAttendanceChart(){

    const cxt: any = document.getElementById('attendanceChart');

    const present = (this.attendance() ??[]).filter(a => a.status === 'Present').length;
    const absent = (this.attendance()?? []).filter(a => a.status === 'Absent').length;
    
    this.attendanceChart = new Chart(cxt, {
      type : 'bar',
      data:{
        labels:['Present', 'Absent'],
        datasets:[{
          label: 'Attendance',
          data:[present,absent],
          backgroundColor:['#198754', '#dc3545'],
          borderRadius:8
        }]
      },

      options: {
        responsive :true,
        maintainAspectRatio:false,
        animation:{
          duration:1500,
          easing:'easeInOutBounce'
        },
        plugins:{
          legend:{
            display:false
          }
        }
      }
    });
  }



  updateCharts(){

    if(this.staffChart){
      this.staffChart.data.datasets[0].data = [
        this.managers().length,
        this.employees().length
      ];
      this.staffChart.update();
    }

    if(this.attendanceChart){

      const present = this.attendance().filter(a => a.status === 'Present').length;
      const absent = this.attendance().filter(a => a.status === 'Absent').length;

      this.attendanceChart.data.datasets[0].data = [present,absent];
      this.attendanceChart.update();
    }
  }


  private autoReloadPage:any;

  ngOnInit(): void {
    this.loadData();

    setTimeout(()=>{
      this.createStaffChart();
      this.createAttendanceChart()      
    },1000);

    this.autoReloadPage = interval(2000).subscribe(()=>{
      this.loadData();
      this.updateCharts()
    });
  }


  ngOnDestroy(): void {
    if(this.autoReloadPage){
    this.autoReloadPage.unsubscribe();
   }
  }



  loadData(){
    this.hrService.getEmployees().subscribe(res =>{
      this.employees.set(res);
    });


    this.hrService.getManagers().subscribe(res => {
      this.managers.set(res);
    })

    this.hrService.getAttendance().subscribe(res => {
      this.attendance.set(res);
    });
  }
  
  
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
