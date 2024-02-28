import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { Observable } from 'rxjs';
import { CatalogCardService } from 'src/app/core/services/catalog-card.service';
import { CatalogCard, CatalogCards } from 'src/app/core/interfaces/catalog';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [CommonModule, CatalogCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit{
  constructor(private cardService: CatalogCardService) { }

  public catalogCards$!: Observable<[CatalogCard]>;

  public ngOnInit(): void {
    this.catalogCards$ = this.cardService.getCatalogCards();
  }

}
