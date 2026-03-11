import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';

@Component({
  selector: 'app-hrnavbar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './hrnavbar.html',
  styleUrl: './hrnavbar.css',
})
export class Hrnavbar {

  private router = inject(Router)
  private profileService = inject(HrProfileService);

  profile = this.profileService.profileSignal;

  constructor(){
    this.profileService.loadProfile();
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
