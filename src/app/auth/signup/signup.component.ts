import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobackComponent } from 'src/app/shared/goback/goback.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SignInBody,
  SignUpBody,
  SignUpRequestBody,
} from 'src/app/core/interfaces/auth';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';
import { HttpErrorService } from 'src/app/core/services/http-error.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    GobackComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ChangePasswordComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  @Input() formId!: string;
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeSignupForm: EventEmitter<any> = new EventEmitter();
  isModalType!: boolean;
  isError: boolean = false;
  continueWithEmailClicked = false;
  showPassword = false;
  loginActive: boolean = false;
  authForm: FormGroup;
  @Output() openChangePassword: EventEmitter<void> = new EventEmitter<void>();
  private isModalTypeSubscription!: Subscription;
  private isErrorSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {
    this.isModalTypeSubscription = this.authService.isModalTypeOpen$.subscribe(
      isModal => {
        this.isModalType = isModal;
      }
    );
    console.log('SignupComponent', this.isModalType);
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^.{8,}$/)]],
    });
    this.isErrorSubscription = this.httpErrorService.isError$.subscribe(
      isErrorStatus => {
        this.isError = isErrorStatus;
        this.cdr.markForCheck();
      }
    );
  }
  ngOnInit(): void {
    this.toggleLoginButton();
    // this.isModalTypeSubscription = this.authService.isModalTypeOpen$.subscribe(
    //   isModal => {
    //     this.isModalType = isModal;
    //   }
    // );
  }

  gobackButton() {
    this.continueWithEmailClicked = false;
  }
  onForgotPasswordButton() {
    this.eventService.emitforgotPasswordEvent();
    this.eventService.emitNotOpenSignUpEvent();
  }
  // closeSignUpForm() {
  //   this.eventService.emitSignUpFormEvent();
  // }
  closeSignUpForm() {
    this.isModalType = false;
    console.log('closeSignUpForm', this.formId);
    this.authService.setModalStatus(false);

    this.eventService.emitCloseSignUpFormEvent(this.formId);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleLoginButton() {
    this.loginActive = true;
    if (this.authForm.get('username')) {
      this.authForm.removeControl('username');
    }
  }
  toggleSignUpButton() {
    console.log('toggleSignUpButton');
    this.loginActive = false;
    this.authForm.addControl(
      'username',
      this.formBuilder.control('', [Validators.required])
    );
  }

  requestData = {} as SignUpRequestBody;

  onContinueWithEmailButton(): void {
    const emailControl = this.authForm && this.authForm.get('email');
    if (emailControl?.invalid) {
      console.log('emailControl.invalid');
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
      return;
    }
    const data = this.authForm.value as SignUpBody;
    this.requestData.username = data.username;
    this.requestData.password = data.password;
    this.requestData.jobTitle = '';
    this.authService.signUp(this.requestData);
  }

  onLigInButton(): void {
    const emailControl = this.authForm && this.authForm.get('email');
    const passwordControl = this.authForm && this.authForm.get('password');
    if (emailControl?.invalid || passwordControl?.invalid) {
      return;
    }
    const data = this.authForm.value as SignInBody;
    this.requestData.email = data.email;
    this.requestData.password = data.password;
    this.authService.logIn(this.requestData);
  }
  ngOnDestroy(): void {
    if (this.isModalTypeSubscription) {
      this.isModalTypeSubscription.unsubscribe();
    }
    if (this.isErrorSubscription) {
      this.isErrorSubscription.unsubscribe();
    }
  }
}
