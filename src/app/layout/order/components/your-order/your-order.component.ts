import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInfoComponent } from 'src/app/layout/shoping-cart/order-info/order-info.component';
import { OrderTotalComponent } from 'src/app/layout/shoping-cart/order-total/order-total.component';

@Component({
  selector: 'app-your-order',
  standalone: true,
  imports: [CommonModule, OrderInfoComponent, OrderTotalComponent],
  templateUrl: './your-order.component.html',
  styleUrls: ['./your-order.component.scss'],
})
export class YourOrderComponent {
  @Input() isOrderSm!: boolean;
}
