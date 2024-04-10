import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from './core/services/event.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { ModalComponent } from './shared/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    FormsModule,
    ModalComponent,
  ],
  providers: [HttpClientModule, HttpClient],
})
export class AppComponent implements OnChanges{
  @HostListener('window:beforeunload', ['$event'])
  title = 'sub_skill';
  modalOpen: boolean = false;
  modalSubscription!: Subscription;

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {
    this.modalSubscription = this.eventService.modalEvent$.subscribe(() => {
      console.log('Modal event received by AppComponent');

      console.log('this.modalOpen before emit', this.modalOpen);

      this.modalOpen = !this.modalOpen;
      this.cdr.detectChanges();
      console.log('this.modalOpen after emit', this.modalOpen);
    });
    window.addEventListener('beforeunload', event => {
      this.beforeUnloadHandler();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.modalSubscription = this.eventService.modalEvent$.subscribe(() => {  
      console.log('Modal event received by AppComponent');

      console.log('this.modalOpen before emit', this.modalOpen);

      this.modalOpen = !this.modalOpen;
      this.cdr.detectChanges();
      console.log('this.modalOpen after emit', this.modalOpen);
    });
  }
  beforeUnloadHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    return '';
  }
}
