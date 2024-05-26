import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { CatalogCard } from '../interfaces/catalog';
import { ShopingCartHttpService } from './shoping-cart-http.service';

@Injectable({
  providedIn: 'root',
})
export class ShopingCartService {
  forOrderingCardsSubject = new BehaviorSubject<CatalogCard[]>([]);
  forOrderingCards$: Observable<CatalogCard[]> =
    this.forOrderingCardsSubject.asObservable();
  afterPaymentCardsSubject = new BehaviorSubject<CatalogCard[]>([]);
  afterPaymentCards$: Observable<CatalogCard[]> =
    this.afterPaymentCardsSubject.asObservable();
  constructor(private shopingCartHttpService: ShopingCartHttpService) {}

  loadForOrderingCards() {
    this.shopingCartHttpService
      .getAllForOrderingCards()
      .pipe(
        catchError(error => {
          console.error('Error loading data:', error);
          return throwError(error);
        })
      )
      .subscribe(cards => {
        this.forOrderingCardsSubject.next(cards);
      });
  }

  // loadAllCardAfterPayment() {
  //   this.shopingCartHttpService
  //     .getAllCardAfterPayment()
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error loading data:', error);
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe(cards => {
  //       this.forOrderingCardsSubject.next(cards);
  //     });
  // }
}
