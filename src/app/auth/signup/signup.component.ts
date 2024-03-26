import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobackComponent } from 'src/app/shared/goback/goback.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpBody, SignUpRequestBody } from 'src/app/core/interfaces/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    GobackComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  continueWithEmailClicked = false;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required]),

    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^.{8,}$/),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm.valueChanges.subscribe(() => {
      this.authForm.markAsTouched();
    });
  }

  requestData = {} as SignUpRequestBody;
  encodeData(data: any): string {
    return btoa(JSON.stringify(data));
  }
  onContinueWithEmailButton(): void {
    // if (this.authForm.invalid) {
    //   return;
    // }
    const emailData = this.authForm.value.email as string;
    const encodedData = this.encodeData(emailData);
    console.log(encodedData);

    console.log('data', emailData);
    this.requestData.email = encodedData;
    this.continueWithEmailClicked = true;
  }
  onSingUpButton(): void {
    if (this.authForm.invalid) {
      return;
    }
    const data = this.authForm.value as SignUpBody;
    this.requestData.username = data.username;
    this.requestData.password = data.password;
    this.requestData.imageUrl =
      'https://www.flaticon.com/free-icon/profile_3135715?term=user&page=1&position=4&origin=search&related_id=3135715';

    console.log('this.requestData', this.requestData);
    this.authService.signUp(this.requestData);
  }
}
