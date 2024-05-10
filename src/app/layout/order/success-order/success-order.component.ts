import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss'],
})
export class SuccessOrderComponent {}
