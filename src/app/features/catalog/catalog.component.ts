import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCartComponent } from './catalog-card/catalog-card.component';
import { Observable } from 'rxjs';
import { CatalogCartService } from 'src/app/core/services/catalog-card.service';
import { CatalogCard, CatalogCards } from 'src/app/core/interfaces/catalog';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [CommonModule, CatalogCartComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit{
  constructor(private cartService: CatalogCartService) { }

  public catalogCarts$!: Observable<[CatalogCard]>;

  public ngOnInit(): void {
    this.catalogCarts$ = this.cartService.getCatalogCarts();
  }

}
