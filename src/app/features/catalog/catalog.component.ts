import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { Observable, from, of, tap } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { CatalogHorizontalCardComponent } from 'src/app/shared/components/catalog-horizontal-card/catalog-horizontal-card.component';
import { SearchService } from 'src/app/core/services/search.service';

import { CatalogCategoriesService } from 'src/app/core/services/catalog-categories.service';
import { ActivatedRoute } from '@angular/router';

import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';
import { CatalogCategory } from 'src/app/core/interfaces/categories-side-bar';


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

  ) { }


  public catalogCards$!: Observable<CatalogCard[]>;
  public catalogCurrentCards: CatalogCard[] = [];
  public ProfessionTechnologies$!: Observable<CatalogCategory[]>;

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const nameProf = params.get('name');
      let currentCategories: CatalogCategory[];
      console.log(nameProf);
      this.ProfessionTechnologies$ = this.cardService.getProfessionTechnologies(nameProf ? nameProf : 'all')
      this.ProfessionTechnologies$.subscribe(val => {

        currentCategories = val;

        for (let i = 0; i < currentCategories.length; i++) {
          this.cardService.getCategoryCards(`${currentCategories[i].id}`)
            .pipe(
              tap(val => val.map(val2 => this.catalogCurrentCards.push(val2)))
            )
            .subscribe();
        }
        this.catalogCards$ = of(this.catalogCurrentCards);
        this.catalogCurrentCards = [];
      },
        (err) => console.log(err),
        () => {
          console.log(this.catalogCurrentCards);
        }
      )
    }
    )
  };




  goBack(): void {
    window.history.back();
  }
}
