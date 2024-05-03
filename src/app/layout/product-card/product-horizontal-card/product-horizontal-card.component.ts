import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';
import { Router } from '@angular/router';
import { ShopingCartHttpService } from 'src/app/core/services/shoping-cart-http.service';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';

@Component({
  selector: 'app-product-horizontal-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, ButtonComponent],
  templateUrl: './product-horizontal-card.component.html',
  styleUrls: ['./product-horizontal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHorizontalCardComponent {
  @Input() public product!: CatalogCard;
  @Output() cardDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() cardDeletedFromCart: EventEmitter<number> =
    new EventEmitter<number>();

  constructor(
    private cardHttpService: CatalogCardHttpService,
    private shopingCartHttpService: ShopingCartHttpService,
    private router: Router,
    private shopingCartService: ShopingCartService
  ) {}

  public toggleSaves(event: Event, id: number): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/not-logged-page']);
    } else {
      if (this.product.isSaved) {
        this.product.isSaved = !this.product.isSaved;
        this.cardHttpService.removeMicroskillById(this.product.id).subscribe();
        this.cardDeleted.emit(id);
      } else {
        this.product.isSaved = !this.product.isSaved;

        this.cardHttpService.saveMicroskillById(this.product.id).subscribe();
      }
    }
  }
  public toggleAddToCard(id: number): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['not-logged-page/cart']);
    } else {
      if (this.product.isIntoCart) {
        this.product.isIntoCart = !this.product.isIntoCart;
        this.shopingCartHttpService
          .removeCardForOrderingById(this.product.id)
          .subscribe(response => {
            // this.shopingCartService.forOrderingCardsSubject.next(response);
          });
        this.cardDeletedFromCart.emit(id);
      } else {
        this.product.isIntoCart = !this.product.isIntoCart;

        this.shopingCartHttpService
          .saveCardForOrderingById(this.product.id)
          .subscribe(response => {
            this.shopingCartService.forOrderingCardsSubject.next(
              response.listOfMicroSkills
            );
          });
      }
    }
  }
}
