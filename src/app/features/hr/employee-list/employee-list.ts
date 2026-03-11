import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Hrservice } from '../../../core/services/hr-dashboard/hrservice';
import { CommonModule } from '@angular/common';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';


@Component({
  selector: 'app-employee-list',
  imports: [RouterModule,CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {


  private route = inject(ActivatedRoute);
  private hrService = inject(Hrservice);
  private router = inject(Router);
  private profileService = inject(HrProfileService);

  employees = signal<any[]>([]);
  allEmployees = signal<any[]>([]);
  searchTerm = signal('');
  selectedEmployee = signal<any|null>(null);


  sidebarOpen = true;
  profile = this.profileService.profileSignal;


  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  constructor(){
    const resolvedData = this.route.snapshot.data['employeeslistData'];
    const data = resolvedData.employees ?? [];
    this.employees.set(data);
    this.allEmployees.set(data)
    this.profileService.loadProfile();
  }


  
  private autoReloadPage:any;
    
  ngOnInit(): void {
    this.loadData();
  }
    
    
  ngOnDestroy(): void {
    if(this.autoReloadPage){
      this.autoReloadPage.unsubscribe();
    }
  }
  

  loadData(){
    this.hrService.getEmployees().subscribe(res =>{
      this.allEmployees.set(res);
      this.applyFilter();
    });
  }



  applyFilter() {
    const value = this.searchTerm().toLowerCase();

    if (!value) {
      this.employees.set(this.allEmployees());
      return;
    }

    const filtered = this.allEmployees().filter(emp =>
      emp.name.toLowerCase().includes(value) ||
      emp.email.toLowerCase().includes(value) ||
      emp.phone.toLowerCase().includes(value)
    );

    this.employees.set(filtered);
  }





  onSearch(event: any) {
    const value = event.target.value.toLowerCase();
    this.searchTerm.set(value);

    this.applyFilter();
  }



  viewEmployee(employee:any){
    this.selectedEmployee.set(employee);
  }



  deleteEmployee(id:number){
    if(confirm("Are you sure to delete?")){
      this.hrService.deleteUser(id).subscribe({
        next:()=>{

          const updated = this.allEmployees().filter(e => e.id !== id);
          this.allEmployees.set(updated);
          this.employees.set(updated);
        },

        error:(err)=>{
          console.error("Delete failed",err);
        }
      })
    }
  }



  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}

