import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { Observable, of } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { CatalogHorizontalCardComponent } from 'src/app/shared/components/catalog-horizontal-card/catalog-horizontal-card.component';
import { SearchService } from 'src/app/core/services/search.service';

import { CatalogCategoriesService } from 'src/app/core/services/catalog-categories.service';
import { ActivatedRoute } from '@angular/router';

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

    private cardService: CatalogCategoriesService,
    private route: ActivatedRoute,
    private cardHttpService: CatalogCardHttpService,
    private searchService: SearchService
  ) {}


  public catalogCards$!: Observable<CatalogCard[]>;

  public ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.catalogCards$ = this.cardService.getCategoryCards(id ? id : 'all')
    })
    };


  
  goBack(): void {
    window.history.back();
  }
}
