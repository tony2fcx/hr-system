import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MgProfileService } from '../../../core/services/MgProfileService/mg-profile-service';

@Component({
  selector: 'app-manager-profile-update',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './manager-profile-update.html',
  styleUrl: './manager-profile-update.css',
})
export class ManagerProfileUpdate {

  private route = inject(ActivatedRoute)
  private service = inject(MgProfileService)
  private router = inject(Router)

  profile = signal<any>(this.route.snapshot.data['profileData']);
  selectedImage = signal<File|null>(null);
  imagePreview = signal<string|null>(null);

  loading = false

  errorMessage:string =''
  showError:boolean = false;
  successMessage:string = "";

  sidebarOpen = false;


  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }



  onImageSelected(event:Event){

    const file = (event.target as HTMLInputElement).files?.[0];

    if(file){
      this.selectedImage.set(file);

      const reader = new FileReader()
      reader.onload = ()=>{
        this.imagePreview.set(reader.result as string);
      }

      reader.readAsDataURL(file);
    }
  }



  private showTemporaryError(message:string){
    this.errorMessage = message
    this.showError = true;

    setTimeout(()=>{
      this.showError = false
      this.errorMessage="";
    },3000)
  }





  updateProfile(){

    const name = this.profile().name?.trim();
    const email = this.profile().email?.trim();
    const phone = this.profile().phone?.trim();


    if(!name){
      return this.showTemporaryError("Name is required..");
    }

    if(name.length <3){
      return this.showTemporaryError("Name must be at least 3 characters..")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email){
      return this.showTemporaryError('Email is required..');
    }

    if(!emailRegex.test(email)){
      return this.showTemporaryError("Enter a valid email address.")
    }

    const phoneRegex = /^[0-9]{10}$/;

    if(!phone){
      return this.showTemporaryError('Phone number is required..')
    }

    if(!phoneRegex.test(phone)){
      return this.showTemporaryError('Phone number must be 10 digits..')
    }

    this.loading = true;


    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);


    if(this.selectedImage()){
      formData.append('profile_image', this.selectedImage()!);
    }

    this.service.updateProfile(formData).subscribe({

      next:()=>{
        this.successMessage = "Profile update successfully";
        this.loading = false;
        this.service.loadProfile();   
        
      },

      error:()=>{
        this.showTemporaryError("Profile update failed..")
        this.loading = false;
      }
    });
  }



  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
