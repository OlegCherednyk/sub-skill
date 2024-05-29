import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { Observable, from, of, tap, map, switchMap, forkJoin } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  constructor(
    private cardService: CatalogCategoriesService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  public catalogCards$!: Observable<CatalogCard[]>;
  public catalogCurrentCards: CatalogCard[] = [];
  public ProfessionTechnologies$!: Observable<CatalogCategory[]>;

  // public ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     const nameProf = params.get('name');
  //     let currentCategories: CatalogCategory[];
  //     console.log(nameProf);
  //     this.ProfessionTechnologies$ = this.cardService.getProfessionTechnologies(
  //       nameProf ? nameProf : 'all'
  //     );
  //     this.ProfessionTechnologies$.subscribe(
  //       val => {
  //         currentCategories = val;

  //         for (let i = 0; i < currentCategories.length; i++) {
  //           this.cardService
  //             .getCategoryCards(`${currentCategories[i].id}`)
  //             .pipe(
  //               tap(val => val.map(val2 => this.catalogCurrentCards.push(val2)))
  //             )
  //             .subscribe();
  //         }
  //         this.catalogCards$ = of(this.catalogCurrentCards);
  //         this.catalogCurrentCards = [];
  //       },
  //       err => console.log(err),
  //       () => {
  //         console.log(this.catalogCurrentCards);
  //       }
  //     );
  //   });
  // }
  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const nameProf = params.get('name');
      console.log(nameProf);

      let categoryRequests: Observable<CatalogCard[]>[] = [];

      if (nameProf && nameProf.toLowerCase() !== 'all') {
        this.ProfessionTechnologies$ =
          this.cardService.getProfessionTechnologies(nameProf);
      } else {
        if (nameProf && nameProf.toLowerCase() === 'all') {
          this.ProfessionTechnologies$ =
            this.cardService.getProfessionTechnologies(nameProf);
        }
      }

      this.ProfessionTechnologies$.pipe(
        switchMap(categories => {
          if (nameProf && nameProf.toLowerCase() !== 'all') {
            for (let i = 0; i < categories.length; i++) {
              categoryRequests.push(
                this.cardService.getCategoryCards(categories[i].id.toString())
              );
            }
          } else {
            categoryRequests.push(this.cardService.getCategoryCards('all'));
          }

          return forkJoin(categoryRequests);
        })
      ).subscribe(
        categoryCards => {
          this.catalogCards$ = of(categoryCards.flat());
          this.cdr.detectChanges();
        },
        err => console.error(err)
      );
    });
  }


  goBack(): void {
    window.history.back();
  }
}
