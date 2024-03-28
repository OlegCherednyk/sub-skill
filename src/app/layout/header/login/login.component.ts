import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, SignupComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string | null = null;
  signUpFormOpen: boolean = false;
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
}
