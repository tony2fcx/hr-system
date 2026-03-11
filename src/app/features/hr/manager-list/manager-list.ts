import { Component, inject, signal } from '@angular/core';
import { Hrservice } from '../../../core/services/hr-dashboard/hrservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';


@Component({
  selector: 'app-manager-list',
  imports: [RouterModule,CommonModule],
  templateUrl: './manager-list.html',
  styleUrl: './manager-list.css',
})
export class ManagerList {

  private hrService = inject(Hrservice);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profileService = inject(HrProfileService);
    
  profile = this.profileService.profileSignal;

  managers = signal<any[]>([]);
  selectedManager = signal<any|null>(null);
  searchTerm = signal('');
  allManagers = signal<any[]>([]);

  sidebarOpen = true;


  constructor(){
    const resolvedData = this.route.snapshot.data['managerslistData'];
    const managersData = resolvedData.managers ?? [];

    this.managers.set(managersData);
    this.allManagers.set(managersData);

    this.profileService.loadProfile();
  }
  
  
  ngOnInit(): void {
    this.loadData();
  }
  
  
  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }


  loadData(){
    this.hrService.getManagers().subscribe(res =>{
      
      this.allManagers.set(res);

      const searchValue = this.searchTerm().toLowerCase();

      if(searchValue){
        const filtered = this.allManagers().filter(m =>
          m.name.toLowerCase().includes(searchValue)||
          m.email.toLowerCase().includes(searchValue)||
          m.phone.toLowerCase().includes(searchValue)
        )
        this.managers.set(filtered);
      }else{
        this.managers.set(res);
      }
      
    });
  }



  onSearch(event:any){
    const value = event.target.value.toLowerCase()
    this.searchTerm.set(value);
    this.applyFilter();
  }



  applyFilter() {
    const value = this.searchTerm();

    if (!value) {
      this.managers.set(this.allManagers());
      return;
    }

    const filtered = this.allManagers().filter(m =>
      m.name.toLowerCase().includes(value) ||
      m.email.toLowerCase().includes(value) ||
      m.phone.toLowerCase().includes(value)
    );

    this.managers.set(filtered);
  }





  deleteManager(id:number){
    if(confirm("Are you sure to delete?")){
      this.hrService.deleteUser(id).subscribe({
        next:()=>{

          const updateAll = this.allManagers().filter(m => m.id !== id);
          this.allManagers.set(updateAll);

          const updateManagers = this.managers().filter(m => m.id !== id);
          this.managers.set(updateManagers)
        },
        error:(err)=>{
          console.error("Delete Failed",err)
        }
      })
    }
  }


  viewManager(manager:any){
    this.selectedManager.set(manager);
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
