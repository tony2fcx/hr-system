import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/authService/authservice';


@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  loginForm!: FormGroup;

  errorMessage:string ="";
  showError:boolean = false;


  showPassword: boolean = false;


  constructor(
    private fb: FormBuilder,
    private auth : AuthService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
    })
  }


  private showTemporaryError(message:string){
    this.errorMessage = message;
    this.showError = true;

    setTimeout(()=>{
      this.showError = false;
      this.errorMessage = ''
    },3000)
  }


  togglePassword(){
    this.showPassword = !this.showPassword
  }



  onSubmit() {

    if (this.loginForm.invalid) {

      const email = this.loginForm.get('email');
      const password = this.loginForm.get('password');

      if (email?.errors?.['required']) {
        return this.showTemporaryError('Email is required.');
      }

      if (email?.errors?.['email']) {
        return this.showTemporaryError('Enter a valid email address.');
      }

      if (password?.errors?.['required']) {
        return this.showTemporaryError('Password is required.');
      }

      if (password?.errors?.['minlength']) {
        return this.showTemporaryError('Password must be at least 8 characters.');
      }

      if (password?.errors?.['pattern']) {
        return this.showTemporaryError(
          'Password must contain 1 uppercase, 1 lowercase, 1 number & 1 special character.'
        );
      }

      return;
    }

    const formData = this.loginForm.value;

    this.auth.login(formData).subscribe({
      next: (res) => {
        console.log(res)
        this.auth.saveTokens(res.access_token, res.refresh_token);
        this.auth.setRole(res.role);
        this.redirectByRole(res.role);
      },
      error: () => {
        this.showTemporaryError("Invalid Credentials");
      }
    });
  }


  redirectByRole(role: string) {
    const userRole = role.toUpperCase();

    if (userRole === 'HR') {
      this.router.navigate(['/dashboard/hr'], {replaceUrl:true});
    }
    else if (userRole === 'MANAGER') {
      this.router.navigate(['/dashboard/manager'],{replaceUrl:true});
    }
    else if (userRole === 'EMPLOYEE') {
      this.router.navigate(['/dashboard/employee'],{replaceUrl:true});
    }
    else {
      this.router.navigate(['/auth/login'], {replaceUrl:true});
    }
  }
}
