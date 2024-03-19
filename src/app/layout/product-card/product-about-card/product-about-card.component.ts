import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCard } from 'src/app/core/interfaces/catalog';

@Component({
  selector: 'app-product-about-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-about-card.component.html',
  styleUrls: ['./product-about-card.component.scss'],
})
export class ProductAboutCardComponent {
  @Input() public product!: CatalogCard;
}
