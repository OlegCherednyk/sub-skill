import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './server-error-page.component.html',
  styleUrls: ['./server-error-page.component.scss'],
})
export class ServerErrorPageComponent {}
