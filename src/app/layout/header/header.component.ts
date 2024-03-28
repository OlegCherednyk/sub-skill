import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { Observable } from 'rxjs';
import { ModalData } from 'src/app/core/interfaces/modal';

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
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  modalData$: Observable<ModalData>;
  constructor(
    public modalService: ModalService,
    private router: Router
  ) {
    this.modalData$ = this.modalService.modalData$;
  }

  toHomePage() {
    this.router.navigate(['']);
  }
}
