import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCard } from 'src/app/core/interfaces/catalog';

@Component({
  selector: 'app-product-what-is-in-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-what-is-in-card.component.html',
  styleUrls: ['./product-what-is-in-card.component.scss'],
})
export class ProductWhatIsInCardComponent {
  @Input() public product!: CatalogCard;
}
