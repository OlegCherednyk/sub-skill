import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-order-single-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  templateUrl: './order-single-card.component.html',
  styleUrls: ['./order-single-card.component.scss'],
})
export class OrderSingleCardComponent
{
  @Input() public orderCard!: CatalogCard;
  constructor(
    private eventService: EventService,
  )
  { }
    deleteForOrderCard() {
      this.eventService.emitDeleteForOrderCardEvent(this.orderCard.id);
    }
  
}
