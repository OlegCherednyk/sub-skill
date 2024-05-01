import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@Component({
  selector: 'app-not-logged-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SignupComponent],
  templateUrl: './not-logged-page.component.html',
  styleUrls: ['./not-logged-page.component.scss'],
})
export class NotLoggedPageComponent implements OnDestroy {
  signUpFormOpen: boolean = false;
  private signupFormSubscription: Subscription;
  constructor(
    public authService: AuthService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {
    this.signupFormSubscription = this.eventService.signUpFormEvent$.subscribe(
      () => {
        this.signUpFormOpen = !this.signUpFormOpen;
        this.cdr.detectChanges();
      }
    );
  }
  openLoginForm() {
    this.signUpFormOpen = true;
    this.authService.setModalStatus(true);
  }
  ngOnDestroy() {
    this.signupFormSubscription.unsubscribe();
  }
}