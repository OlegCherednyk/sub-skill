import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from 'src/app/core/services/search.service';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { of } from 'rxjs';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  keyword = '';
  filteredItems: CatalogCard[] = [];
  constructor(
    private searchService: SearchService,
    private catalogCardHttpService: CatalogCardHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.catalogCardHttpService
      .getCatalogCardsData()
      .subscribe((cards: CatalogCard[]) => {
        console.log('SearchComponent', cards);
        this.searchService.setCatalogCards(cards);
      });
    this.searchService.keyword$.subscribe(keyword => {
      this.filteredItems = this.searchService.filterCourses(keyword);
      if (!keyword.trim()) {
        this.filteredItems = [];
      }
    });
  }
  onInputChange(keyword: string) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (keyword === '') {
      this.filteredItems = [];
    }
    this.debounceTimer = setTimeout(() => {
      this.searchService.setKeyword(keyword);
    }, 100);
  }
  onSelectItem(item: CatalogCard) {
    this.router.navigate(['/product-card', item.id]);

    this.keyword = '';
    this.filteredItems = [];
  }
  private debounceTimer: any = null;
}
