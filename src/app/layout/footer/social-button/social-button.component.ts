import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from 'src/app/core/interfaces/icon';

@Component({
  selector: 'social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class SocialButtonComponent {
  @Input() public icon!: Icon;
}
