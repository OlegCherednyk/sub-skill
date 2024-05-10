import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHorizontalCardComponent } from './product-horizontal-card/product-horizontal-card.component';
import { ProductAboutCardComponent } from './product-about-card/product-about-card.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { ProductWhatIsInCardComponent } from './product-what-is-in-card/product-what-is-in-card.component';
import { ProductAutolayoutCardComponent } from './product-autolayout-card/product-autolayout-card.component';
import { GobackComponent } from 'src/app/shared/goback/goback.component';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    ProductHorizontalCardComponent,
    ProductAboutCardComponent,
    ProductWhatIsInCardComponent,
    ProductAutolayoutCardComponent,
    GobackComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  productId!: string | null;

  product$!: Observable<CatalogCard | null>;
  constructor(
    private route: ActivatedRoute,
    private catalogCardHttpService: CatalogCardHttpService,
    private cardHttpService: CatalogCardHttpService
  ) {}
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (localStorage.getItem('token') && this.productId !== null) {
      this.product$ = this.catalogCardHttpService
        .getCardById(+this.productId)
        .pipe(
          switchMap(product => {
            return this.cardHttpService.getAllSavedMicroskill().pipe(
              switchMap(savedCards => {
                const foundCard = savedCards.find(
                  savedCard => savedCard.id === product.id
                );
                if (foundCard) {
                  product.isSaved = true;
                } else {
                  product.isSaved = false;
                }
                return of(product);
              })
            );
          })
        );
    } else {
      if (this.productId !== null) {
        this.product$ = this.catalogCardHttpService
          .getCardById(+this.productId)
          .pipe(
            map(product => {
              if (!product) {
                return null;
              }
              product.isSaved = false;
              return product;
            })
          );
      }
    }
  }
}
