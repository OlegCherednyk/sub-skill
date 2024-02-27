import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { TruncateDirective } from 'src/app/shared/directives/truncate.directive';

@Component({
  selector: 'catalog-cart',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, TruncateDirective],
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCartComponent {
  @Input() public cart!: CatalogCard;
  
}
