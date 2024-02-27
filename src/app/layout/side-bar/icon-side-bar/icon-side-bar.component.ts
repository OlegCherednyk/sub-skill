import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from 'src/app/core/interfaces/icon';

@Component({
  selector: 'icon-side-bar',
  templateUrl: './icon-side-bar.component.html',
  styleUrls: ['./icon-side-bar.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class IconSideBarComponent {
  
  @Input() public icon!: Icon;
}
