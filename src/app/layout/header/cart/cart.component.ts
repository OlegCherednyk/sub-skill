import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShopingCartHttpService } from 'src/app/core/services/shoping-cart-http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  counter: number = 0;
  forOrderingCards$!: Observable<CatalogCard[]>;

  constructor(
    private router: Router,
    private shopingCartService: ShopingCartService,

    private authService: AuthService
  ) {
    this.authService.username$.subscribe(username => {
      if (username) {
        this.shopingCartService.loadForOrderingCards();
      }
      this.forOrderingCards$ = this.shopingCartService.forOrderingCards$;
    });
  }



  toCartPage() {
    this.router.navigate(['/cart']);
  }
}
