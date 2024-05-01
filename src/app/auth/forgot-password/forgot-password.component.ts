import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ForgotPasswordBody } from 'src/app/core/interfaces/auth';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isnotOpenSignUpEvent = false;
  requestData!: ForgotPasswordBody;
  notOpenSignUpSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.notOpenSignUpSubscription =
      this.eventService.notOpenSignUpEvent$.subscribe(() => {
        this.isnotOpenSignUpEvent = !this.isnotOpenSignUpEvent;
        this.cdr.detectChanges();
      });
  }
  onForgotPasswordButton(): void {
    if (this.forgotPasswordForm.invalid) {
      console.log('repasswordForm.invalid');
      return;
    }

    this.requestData = this.forgotPasswordForm.value;

    console.log('this.requestData', this.requestData);
    // this.authService.forgotPassword(this.requestData);
    let modalInfo = {
      isLogo: true,
      isBookmark: false,
      isProfile: false,

      title: 'Password recovery',
      message: `We sent you a password recovery link to ${this.requestData.email} `,
      additionalMessage: 'Check your e-mail',
      showButtons: false,
    };
    this.modalService.openModal(modalInfo);
    this.eventService.emitModalEvent();
    this.closeForgotPasswordForm();
  }

  closeForgotPasswordForm() {
    this.eventService.emitforgotPasswordEvent();
    if (this.isnotOpenSignUpEvent) {
      this.eventService.emitNotOpenSignUpEvent();
    }
  }
}
