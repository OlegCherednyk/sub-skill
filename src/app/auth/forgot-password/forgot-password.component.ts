import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
  @Output() closeForgot: EventEmitter<any> = new EventEmitter();

  showPassword = false;
  repasswordForm: FormGroup;
  requestData: ChangePasswordBody = { password: '' };
  isChangePasswordMode = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.repasswordForm = this.formBuilder.group({
      newpassword: ['', [Validators.required, Validators.pattern(/^.{8,}$/)]],
      passwordRepeat: [
        '',
        [Validators.required, Validators.pattern(/^.{8,}$/)],
      ],
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  closeForgotPasswordForm() {
    this.closeForgot.emit();
  }

  onChangeForgottenPasswordButton(): void {
    if (this.repasswordForm.invalid) {
      console.log('repasswordForm.invalid');
      return;
    }
    const currentPasswordFromLS = localStorage.getItem('password');
    if (currentPasswordFromLS !== this.repasswordForm.value.currentpassword) {
      console.log(' current password are wrong. Try again');

      return;
    }
    if (
      this.repasswordForm.value.newpassword !==
      this.repasswordForm.value.passwordRepeat
    ) {
      console.log('passwords dont equal');
      return;
    }

    const formData = this.repasswordForm.value;
    this.requestData.password = formData.newpassword;

    console.log('this.requestData', this.requestData);
    this.authService.changePassword(this.requestData);
  }

  onChangePasswordButton(): void {
    if (this.repasswordForm.invalid) {
      return;
    }
    const formData = this.repasswordForm.value;

    this.requestData.password = formData.newpassword;

    if (!this.repasswordForm.get('currentpassword')) {
      this.repasswordForm.addControl(
        'currentpassword',
        this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(/^.{8,}$/),
        ])
      );
    }
  }

  onCancelButton() {
    console.log('cancel');
  }
}
