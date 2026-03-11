import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managernavbar',
  imports: [],
  templateUrl: './managernavbar.html',
  styleUrl: './managernavbar.css',
})
export class Managernavbar {

  private router = inject(Router)
  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
