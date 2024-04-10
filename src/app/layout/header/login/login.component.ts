import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,


  imports: [
    CommonModule,
    RouterModule,
    SignupComponent,
    ChangePasswordComponent,
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  isModal: boolean = true;
isUser:boolean = false;
  username: string | null = null;
  signUpFormOpen: boolean = false;
  // changePasswordFormOpen: boolean = false;
  private signupFormSubscription: Subscription;
  private changePasswordSubscription: Subscription;
  private notOpenSignUpSubscription: Subscription;
  constructor(
    public authService: AuthService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {

    this.authService.username$.subscribe(username => {
      this.username = username || 'Log in';
      if(username){
      this.isUser = true;
      }
    });
 
    this.signupFormSubscription = this.eventService.signUpFormEvent$.subscribe(
      () => {
        console.log('Sign up event received by LoginComponent');
        this.signUpFormOpen = !this.signUpFormOpen;
        this.cdr.detectChanges();
      }
    );
    this.changePasswordSubscription =
      this.eventService.changePasswordEvent$.subscribe(() => {
        this.signUpFormOpen = !this.signUpFormOpen;
        this.cdr.detectChanges();
      });
    this.notOpenSignUpSubscription =
      this.eventService.notOpenSignUpEvent$.subscribe(() => {
        this.signUpFormOpen = false;
        this.cdr.detectChanges();
      });
  }

  openSignUpForm() {
    this.signUpFormOpen = true;
    this.authService.setModalStatus(true)
  }

  closeSignUpForm() {
    this.signUpFormOpen = false;
  }

  ngOnDestroy() {
    this.signupFormSubscription.unsubscribe();
    this.changePasswordSubscription.unsubscribe();
    this.notOpenSignUpSubscription.unsubscribe();
  }
}
