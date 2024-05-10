import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from 'src/app/core/services/search.service';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { of } from 'rxjs';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';

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

  constructor(
    private searchService: SearchService,
    private catalogCardHttpService: CatalogCardHttpService
  ) {}

  ngOnInit() {
    this.catalogCardHttpService
      .getCatalogCardsData()
      .subscribe((cards: CatalogCard[]) => {
        this.searchService.setCatalogCards(cards);
      });
  }
  onInputChange(keyword: string) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.searchService.setKeyword(keyword);
    }, 100);
  }

  private debounceTimer: any = null;
}
