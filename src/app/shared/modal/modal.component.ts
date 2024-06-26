import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalData } from 'src/app/core/interfaces/modal';
import { ButtonComponent } from '../components/button/button.component';
import { delay, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { Router, RouterModule } from '@angular/router';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, OnDestroy {
  modalData!: ModalData;
  isLogo: boolean = false;
  isBookmark: boolean = false;
  isProfile: boolean = false;

  private modalSubscription!: Subscription;
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private eventService: EventService,
    private router: Router,
    private shopingCartService: ShopingCartService
  ) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.modalData$.subscribe(data => {
      this.modalData = data;
      if (data.message !== '' || data.additionalMessage !== '') {
        this.isLogo = data.isLogo;
        this.isBookmark = data.isBookmark;
        this.isProfile = data.isProfile;
      }
    });
    const redirectUrl = this.authService.getRedirectUrl();
    if (redirectUrl) {
      this.router.navigateByUrl(redirectUrl);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  closeModal(): void {
    setTimeout(() => {
      this.eventService.emitModalEvent();
    }, 2000);
  }

  cancel(): void {
    this.closeModal();
  }
  close(): void {
    console.log('this.router.url', this.router.url);
    if (this.router.url === '/') {
      this.eventService.emitModalForHomeEvent();
      this.eventService.emitModalEvent();
    } else {
      this.eventService.emitModalEvent();
    }
  }
  deleteProfile(): void {
    this.authService.deleteAccount();
    this.eventService.emitModalEvent();
    this.shopingCartService.loadForOrderingCards();
    this.authService.setUsername(null);
  }
  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeModal();
  }
  navigateToSkills(): void {
    this.router.navigate(['/my-skills']);
    this.closeModal();
  }
}
