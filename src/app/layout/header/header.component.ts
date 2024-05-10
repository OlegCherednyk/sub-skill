import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { filter, Subscription } from 'rxjs';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { EventService } from 'src/app/core/services/event.service';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    ModalComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy, OnInit {
  pageTitle!: string;
  isModalOpen: boolean = false;
  changePasswordFormOpen: boolean = false;
  forgotPasswordFormOpen: boolean = false;
  private forgotPasswordSubscription: Subscription;
  private changePasswordSubscription: Subscription;
  constructor(
    public modalService: ModalService,
    private router: Router,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {
    this.changePasswordSubscription =
      this.eventService.changePasswordEvent$.subscribe(() => {
        this.changePasswordFormOpen = !this.changePasswordFormOpen;
        this.cdr.detectChanges();
      });
    this.forgotPasswordSubscription =
      this.eventService.forgotPasswordEvent$.subscribe(() => {
        this.forgotPasswordFormOpen = !this.forgotPasswordFormOpen;
        this.cdr.detectChanges();
      });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.router.url.split('/').pop();
        switch (path) {
          case '':
            this.pageTitle = 'Home';
            break;
          case 'cart':
            this.pageTitle = 'Shopping Cart';
            break;
          case 'order':
            this.pageTitle = 'Ordering';
            break;
          case 'profile':
            this.pageTitle = 'Profile settings';
            break;
          case 'signup-page':
            this.pageTitle = 'Profile settings';
            break;
          case 'bookmarks':
            this.pageTitle = 'Bookmarks';
            break;
          case 'not-logged-page':
            this.pageTitle = 'Bookmarks';
            break;
          case 'my-skills':
            this.pageTitle = 'My Skills';
            break;

          default:
            this.pageTitle = 'Unknown';
        }
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.changePasswordSubscription.unsubscribe();
    this.forgotPasswordSubscription.unsubscribe();
  }
}
