import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
