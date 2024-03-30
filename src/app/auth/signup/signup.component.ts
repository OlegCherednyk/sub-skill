import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobackComponent } from 'src/app/shared/goback/goback.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SignInBody,
  SignUpBody,
  SignUpRequestBody,
} from 'src/app/core/interfaces/auth';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    GobackComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ModalComponent,
    ForgotPasswordComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @Output() closeSignupForm: EventEmitter<any> = new EventEmitter();
  continueWithEmailClicked = false;
  showPassword = false;
  loginActive: boolean = false;
  authForm: FormGroup;
  @Output() openForgotPassword: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private authService: AuthService,

    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^.{8,}$/)]],
    });
  }
  gobackButton() {
    this.continueWithEmailClicked = false;
  }

  closeSignUpForm() {
    this.closeSignupForm.emit();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleLoginButton() {
    this.loginActive = true;
    this.authForm.addControl(
      'username',
      this.formBuilder.control('', [Validators.required])
    );
  }
  toggleSignUpButton() {
    this.loginActive = false;

    this.authForm.removeControl('username');
  }

  requestData = {} as SignUpRequestBody;

  onContinueWithEmailButton(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.requestData.email = this.authForm.value.email as string;

    this.continueWithEmailClicked = true;
    if (!this.authForm.get('username')) {
      this.authForm.addControl(
        'username',
        this.formBuilder.control('', [Validators.required])
      );
    }
  }
  onSingUpButton(): void {
    if (this.authForm.invalid) {
      console.log('authForm.invalid');
      return;
    }
    const data = this.authForm.value as SignUpBody;
    this.requestData.username = data.username;
    this.requestData.password = data.password;
    this.requestData.imageUrl = null;

    console.log('this.requestData', this.requestData);
    this.authService.signUp(this.requestData);
  }

  onLigInButton(): void {
    if (this.authForm.invalid) {
      console.log('authForm.invalid');
      return;
    }
    const data = this.authForm.value as SignInBody;
    this.requestData.email = data.email;
    this.requestData.password = data.password;

    console.log('this.requestData', this.requestData);
    // this.authService.logIn(this.requestData);
  }
}
