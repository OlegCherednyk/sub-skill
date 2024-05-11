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
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { EventService } from 'src/app/core/services/event.service';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { PopularCategoriesComponent } from 'src/app/shared/components/popular-categories/popular-categories.component';
import { PopularCategoriesService } from 'src/app/core/services/popular-categories.service';

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
  pageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(
    public modalService: ModalService,
    private router: Router,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private popularCategoriesService: PopularCategoriesService
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
    this.popularCategoriesService.categoryTitle$.subscribe(title => {
      this.pageTitle$.next(title);
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.router.url.split('/').pop();
        switch (path) {
          case '':
            // this.pageTitle = 'Home';
            this.pageTitle$.next('Home');
            break;
          case 'cart':
            // this.pageTitle = 'Shopping Cart';
            this.pageTitle$.next('Shopping Cart');
            break;
          case 'order':
            this.pageTitle$.next('Ordering');
            // this.pageTitle = 'Ordering';
            break;
          case 'profile':
            this.pageTitle$.next('Profile settings');

            // this.pageTitle = 'Profile settings';
            break;
          case 'signup-page':
            this.pageTitle$.next('Profile settings');

            // this.pageTitle = 'Profile settings';
            break;
          case 'bookmarks':
            this.pageTitle$.next('Bookmarks');

            // this.pageTitle = 'Bookmarks';
            break;
          case 'not-logged-page':
            this.pageTitle$.next('Bookmarks');

            // this.pageTitle = 'Bookmarks';
            break;
          case 'my-skills':
            this.pageTitle$.next('My Skills');

            // this.pageTitle = 'My Skills';
            break;

          default:
            this.pageTitle$.next('Home');
        }
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.changePasswordSubscription.unsubscribe();
    this.forgotPasswordSubscription.unsubscribe();
  }
}
