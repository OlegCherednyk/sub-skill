import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHorizontalCardComponent } from './product-horizontal-card/product-horizontal-card.component';
import { ProductAboutCardComponent } from './product-about-card/product-about-card.component';
import { ActivatedRoute } from '@angular/router';
import {  Observable } from 'rxjs';
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

  product$!: Observable<CatalogCard | undefined>;

  constructor(
    private route: ActivatedRoute,
    private catalogCardHttpService: CatalogCardHttpService
  ) {}
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(typeof this.productId);
    console.log('productId', this.productId);

    if (this.productId !== null) {
      this.product$ = this.catalogCardHttpService.getCardById(+this.productId);
    }
  }
}
