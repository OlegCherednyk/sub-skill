import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ChangePasswordBody } from 'src/app/core/interfaces/auth';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnDestroy {
  showNewPassword = false;
  showRepeatPassword = false;
  showCurrentPassword = false;
  isCurrentWrong = false;
  repasswordForm: FormGroup;
  requestData: ChangePasswordBody = { password: '' };
  isnotOpenSignUpEvent = false;
  private notOpenSignUpSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {
    this.repasswordForm = this.formBuilder.group(
      {
        currentpassword: [
          '',
          [Validators.required, Validators.pattern(/^.{8,}$/)],
        ],
        newpassword: ['', [Validators.required, Validators.pattern(/^.{8,}$/)]],
        passwordRepeat: [
          '',
          [Validators.required, Validators.pattern(/^.{8,}$/)],
        ],
      },
      {
        validators: this.passwordMatchValidator(
          'newpassword',
          'passwordRepeat'
        ),
      }
    );
    this.notOpenSignUpSubscription =
      this.eventService.notOpenSignUpEvent$.subscribe(() => {
      
        this.isnotOpenSignUpEvent = !this.isnotOpenSignUpEvent;
        this.cdr.detectChanges();
      });
  }
  passwordMatchValidator(field1: string, field2: string) {
    return (group: FormGroup) => {
      const control1 = group.controls[field1];
      const control2 = group.controls[field2];

      if (control1.value !== control2.value) {
        control2.setErrors({ passwordMismatch: true });
      } else {
        control2.setErrors(null);
      }
    };
  }
  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  togglePasswordRepeatVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }
  togglePasswordCurrentVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  closeChangePasswordForm() {
    this.eventService.emitchangePasswordEvent();
    if (this.isnotOpenSignUpEvent) {
      this.eventService.emitNotOpenSignUpEvent();
    }
  }
  onPasswordBlur() {
    const currentPasswordFromLS = localStorage.getItem('password');

    if (currentPasswordFromLS !== this.repasswordForm.value.currentpassword) {
      this.isCurrentWrong = true;
      return;
    } else {
      this.isCurrentWrong = false; 
    }
  }
  onPasswordInput() {
    const currentPasswordFromLS = localStorage.getItem('password');
    const enteredPassword = this.repasswordForm.value.currentpassword;
  
    if (currentPasswordFromLS === enteredPassword) {
      this.isCurrentWrong = false; 
    }
  }
  
  onChangePasswordButton(): void {
    if (this.repasswordForm.invalid) {
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
    this.authService.changePassword(this.requestData);
  }

  ngOnDestroy() {
    this.notOpenSignUpSubscription.unsubscribe();
  }
}
