import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ShopingCartService } from 'src/app/core/services/shoping-cart.service';
import { MySkillCardComponent } from 'src/app/shared/components/my-skill-card/my-skill-card.component';
import { ShopingCartHttpService } from 'src/app/core/services/shoping-cart-http.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, MySkillCardComponent, ButtonComponent],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
})
export class MySkillsComponent implements OnInit {
  afterPaymentCards$!: Observable<CatalogCard[]>;
  afterPaymentCardsAll: CatalogCard[] = [];
  constructor(
    private shopingCartService: ShopingCartService,
    private shopingCartHttpService: ShopingCartHttpService
  ) {}
  ngOnInit() {
    this.afterPaymentCards$ = this.shopingCartHttpService
      .getAllForOrderingCards()
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(error => {
          console.error('Error loading data:', error);
          return throwError(error);
        })
      );
  }

  // private loadAfterPaymentCards() {
  //   this.shopingCartService.loadForOrderingCards();

  //   this.afterPaymentCards$ = this.shopingCartService.loadAllCardAfterPayment();
  //   this.afterPaymentCards$.subscribe(res => {
  //     this.afterPaymentCardsAll = res;
  //   });
  // }
  onCardDeleted(id: number) {
    const index = this.afterPaymentCardsAll.findIndex(card => card.id === id);
    if (index !== -1) {
      this.afterPaymentCardsAll.splice(index, 1);
    }
  }
}
