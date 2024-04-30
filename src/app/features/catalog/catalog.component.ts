import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { map, Observable, of } from 'rxjs';
import { CatalogCardService } from 'src/app/core/services/catalog-card.service';
import { CatalogCard, CatalogCardsData } from 'src/app/core/interfaces/catalog';
import { CatalogHorizontalCardComponent } from 'src/app/shared/components/catalog-horizontal-card/catalog-horizontal-card.component';
import { SearchService } from 'src/app/core/services/search.service';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [CommonModule, CatalogCardComponent, CatalogHorizontalCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  constructor(
    private cardHttpService: CatalogCardHttpService,
    private searchService: SearchService
  ) {}

  public catalogCards$!: Observable<CatalogCard[]>;

  public ngOnInit(): void {
    this.searchService.keyword$.subscribe(searchKeyword => {
      if (searchKeyword) {
        this.catalogCards$ = of(
          this.searchService.filterCourses(searchKeyword)
        );
      } else {
        this.catalogCards$ = this.cardHttpService.getCatalogCardsData();
      }
    });
  }
}
