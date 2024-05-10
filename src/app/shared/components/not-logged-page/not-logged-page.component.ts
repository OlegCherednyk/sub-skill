import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-logged-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SignupComponent],
  templateUrl: './not-logged-page.component.html',
  styleUrls: ['./not-logged-page.component.scss'],
})
export class NotLoggedPageComponent implements OnInit, OnDestroy {
  signUpFormOpen: boolean = false;
  formId = 'bookmarks';
  source = '';
  title = '';

  private signupFormSubscription: Subscription;
  constructor(
    public authService: AuthService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.signupFormSubscription = this.eventService.closeSignUpForm$.subscribe(
      (closedFormId: string) => {
        if (closedFormId === this.formId) {
          this.signUpFormOpen = false;
          this.cdr.detectChanges();
        }
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.source = params['source'];
      if (this.source === 'bookmarks') {
        this.title = 'Log in to see your bookmarks';
      } else if (this.source === 'cart') {
        this.title = 'Log in to see your cart';
      } else if (this.source === 'order') {
        this.title = 'Log in to see your cart';
      } else if (this.source === 'my-skills') {
        this.title = 'Log in to see your skills';
      }
    });
  }
  openLoginForm() {
    this.signUpFormOpen = true;
    this.authService.setModalStatus(true);
    // this.eventService.emitSignUpFormEvent();
  }
  ngOnDestroy() {
    this.signupFormSubscription.unsubscribe();
  }
}
