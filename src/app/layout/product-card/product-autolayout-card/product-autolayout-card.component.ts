import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ShopingCartHttpService } from 'src/app/core/services/shoping-cart-http.service';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-autolayout-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-autolayout-card.component.html',
  styleUrls: ['./product-autolayout-card.component.scss'],
})
export class ProductAutolayoutCardComponent {
  @Input() public product!: CatalogCard;
  constructor(
    private shopingCartHttpService: ShopingCartHttpService,
    private router: Router,
    private shopingCartService: ShopingCartService
  ) {}
  public toggleBuyNowCard(id: number) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['not-logged-page/cart']);
    } else {
      this.router.navigate(['/cart']);
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
