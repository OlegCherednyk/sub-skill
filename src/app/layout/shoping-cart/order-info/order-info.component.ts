import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSingleCardComponent } from 'src/app/shared/components/order-single-card/order-single-card.component';
import { Observable } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ShopingCartHttpService } from 'src/app/core/services/shoping-cart-http.service';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';

@Component({
  selector: 'app-order-info',
  standalone: true,
  imports: [CommonModule, OrderSingleCardComponent],
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
})
export class OrderInfoComponent implements OnInit {
  forOrderingCards$!: Observable<CatalogCard[]>;
  forOrderingCardsAll: CatalogCard[] = [];
  constructor(
    private shopingCartHttpService: ShopingCartHttpService,
    private shopingCartService: ShopingCartService
  ) {}
  ngOnInit() {
    this.loadForOrderingCards();
  }
  private loadForOrderingCards() {
    this.forOrderingCards$ = this.shopingCartService.forOrderingCards$;
    this.forOrderingCards$.subscribe(res => {
      this.forOrderingCardsAll = res;
      this.forOrderingCardsAll.forEach(card => {
        card.isIntoCart = true;
      });
    });
  }
  onOrderCardDeleted(id: number) {
    const index = this.forOrderingCardsAll.findIndex(card => card.id === id);
    if (index !== -1) {
      this.forOrderingCardsAll.splice(index, 1);
    }
  }
}
