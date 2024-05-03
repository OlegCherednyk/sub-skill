import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobackComponent } from 'src/app/shared/goback/goback.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderTotalComponent } from './order-total/order-total.component';
import { MightLikeComponent } from './might-like/might-like.component';

@Component({
  selector: 'app-shoping-cart',
  standalone: true,
  imports: [CommonModule, GobackComponent, OrderInfoComponent, OrderTotalComponent, MightLikeComponent],
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent {

}
