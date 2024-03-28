import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  ChangePasswordBody,
  ChangePasswordForm,
} from 'src/app/core/interfaces/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  showPassword = false;

  repasswordForm = new FormGroup({
    newpassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^.{8,}$/),
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.pattern(/^.{8,}$/),
    ]),
  });
  constructor(private authService: AuthService) {
    this.repasswordForm.valueChanges.subscribe(() => {
      this.repasswordForm.markAsTouched();
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  data = this.repasswordForm.value as ChangePasswordForm;
  requestData: ChangePasswordBody = {
    password: this.data.newPassword,
  };
  onChangePasswordButton(): void {
    if (this.repasswordForm.invalid) {
      console.log('repasswordForm.invalid');
      return;
    }
    if (
      this.repasswordForm.value.newpassword !==
      this.repasswordForm.value.passwordRepeat
    ) {
      console.log('passwords dont equal');
      return;
    }
    console.log('this.requestData', this.data.password);
    this.authService.changePassword(this.requestData);
  }
  onCancelButton() {
    console.log('cancel');
  }
}
