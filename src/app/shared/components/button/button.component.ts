import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() style: 'dark' | 'light' = 'dark';
  @Input() width: string = '272px';
  @Input() disabled: boolean = false;
  @Input() padding: string = '12px 24px';
}
