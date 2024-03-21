import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';

@Component({
  selector: 'app-product-autolayout-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-autolayout-card.component.html',
  styleUrls: ['./product-autolayout-card.component.scss'],
})
export class ProductAutolayoutCardComponent {
  @Input() public product!: CatalogCard;
}
