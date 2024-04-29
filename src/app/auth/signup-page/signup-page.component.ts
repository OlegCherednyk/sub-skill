import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, SignupComponent],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SignupPageComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.setModalStatus(false)
  }
}
