import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { EventService } from 'src/app/core/services/event.service';
import { ShopingCartHttpService } from 'src/app/core/services/shoping-cart-http.service';

@Component({
  selector: 'app-order-single-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  templateUrl: './order-single-card.component.html',
  styleUrls: ['./order-single-card.component.scss'],
})
export class OrderSingleCardComponent {
  @Input() public orderCard!: CatalogCard;
  @Output() orderCardDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private eventService: EventService,
    private shopingCartHttpService: ShopingCartHttpService
  ) {}

  deleteForOrderCard(event: Event, id: number) {
    event.stopPropagation();

    this.shopingCartHttpService.removeCardForOrderingById(id).subscribe({
      next: () => {
        this.orderCardDeleted.emit(id);
      },
      error: error => {
        console.error(error);
      },
    });
  }
}
