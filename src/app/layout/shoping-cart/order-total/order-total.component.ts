import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';

@Component({
  selector: 'app-order-total',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
})
export class OrderTotalComponent {
  forOrderingItems: CatalogCard[] = [];

  constructor(private shopingCartService: ShopingCartService) {}

  ngOnInit() {
    this.shopingCartService.forOrderingCards$.subscribe(items => {
      this.forOrderingItems = items;
    });
  }
  calculateTotalTime(): number {
    return this.forOrderingItems.reduce((totalTime, card) => {
      const durationNumber = parseInt(card.learningTime, 10);
      if (!isNaN(durationNumber)) {
        return totalTime + durationNumber;
      } else {
        return totalTime;
      }
    }, 0);
  }

  calculateTotalPrice(): number {
    const totalPrice = this.forOrderingItems.reduce(
      (total, card) => total + card.price,
      0
    );
    return Number(totalPrice.toFixed(2));
  }
  orderNow() {}
  backToShop() {}
}
