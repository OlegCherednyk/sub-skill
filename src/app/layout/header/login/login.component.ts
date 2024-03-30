import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string | null = null;
  signUpFormOpen: boolean = false;
  forgotPasswordFormOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }
  openSignUpForm() {
    this.signUpFormOpen = true;
  }

  closeSignUpForm() {
    this.signUpFormOpen = false;
  }
  openForgotPasswordForm() {
    this.signUpFormOpen = false;

    this.forgotPasswordFormOpen = true;
  }

  closeForgotPasswordForm() {
    this.forgotPasswordFormOpen = false;
  }
}
