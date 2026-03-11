import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeCreationService } from '../../../core/services/hr-employee-creation/employee-creation-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HrProfileService } from '../../../core/services/hrProfileService/hrprofile-service';

@Component({
  selector: 'app-employee-creation',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './employee-creation.html',
  styleUrl: './employee-creation.css',
})
export class EmployeeCreation {


  private fb = inject(FormBuilder);
  private empCreateService = inject(EmployeeCreationService);
  private router = inject(Router);
  private profileService = inject(HrProfileService);

  form! : FormGroup;

  loading :boolean= false;
  successMessage:string ='';
  errorMessage : string ='';
  showError :boolean = false
  selectedFile! : File

  profile = this.profileService.profileSignal;


  showPassword: boolean = false;
  sidebarOpen = true;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  togglePassword(){
    this.showPassword = !this.showPassword
  }

  

  constructor(){
    this.form = this.fb.group({
      name :['',[Validators.required, Validators.minLength(3)]],
      email:['',[Validators.required, Validators.email]],
      role:['',Validators.required],
      phone:['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password : ['',[Validators.required, 
        Validators.minLength(8), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]]
    })

    this.profileService.loadProfile();
  }

  onFilechange(event:any){
    this.selectedFile = event.target.files[0]
  }


  private showTemporaryError(message:string){
    this.errorMessage = message;
    this.showError = true;

    setTimeout(()=>{
      this.showError = false
      this.errorMessage="";
    },3000)
  }



  submit(){

    const name = this.form.get('name');
    const email = this.form.get('email')
    const role = this.form.get('role');
    const phone = this.form.get('phone');
    const password = this.form.get('password');


    if(name?.errors?.['required']){
      return this.showTemporaryError('Name is required.')
    }

    if(name?.errors?.['minlength']){
      return this.showTemporaryError('Name must be at least 3 characters.')
    }

    if(email?.errors?.['required']){
      return this.showTemporaryError('Email is required.');
    }

    if(email?.errors?.['email']){
      return this.showTemporaryError('Enter a valid email.');
    }

    if(role?.errors?.['required']){
      return this.showTemporaryError('Please select a role.')
    }

    if(phone?.errors?.['required']){
      return this.showTemporaryError('Phone number required.')
    }

    if(phone?.errors?.['pattern']){
      return this.showTemporaryError('Phone must be 10 digits.')
    }

    if(password?.errors?.['required']){
      return this.showTemporaryError('Password required.')
    }

    if(password?.errors?.['minlength']){
      return this.showTemporaryError('Password must be least 8 characters.')
    }

    if(password?.errors?.['pattern']){
      return this.showTemporaryError(
        'Password must contain 1 uppercase, 1 lowercase, 1 number & 1 special character.'
      );
    }

    if(!this.selectedFile){
      return this.showTemporaryError('Profile image required.')
    }


    this.loading = true;

    const formData = new FormData();

    formData.append('name', this.form.value.name)
    formData.append('email', this.form.value.email)
    formData.append('password', this.form.value.password)
    formData.append('role', this.form.value.role)
    formData.append('phone', this.form.value.phone)
    formData.append('profile_image', this.selectedFile)

    this.empCreateService.register(formData, this.form.value.role)
    .subscribe({

      next:()=>{
        this.successMessage = "Registered Successfully!..";
        this.form.reset();
        this.loading = false
      },

      error:(err)=>{
        this.showTemporaryError(
          err.error.detail || "Register Failed.."
        )
        this.loading = false;
      }
    });
  }



  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
