import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHorizontalCardComponent } from './product-horizontal-card/product-horizontal-card.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ProductHorizontalCardComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  goBack(): void {
    window.history.back();
  }
}
