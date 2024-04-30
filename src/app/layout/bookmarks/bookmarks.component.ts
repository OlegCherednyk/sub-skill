import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardService } from 'src/app/core/services/catalog-card.service';
import { CatalogCardComponent } from 'src/app/shared/components/catalog-card/catalog-card.component';
import { Observable } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, CatalogCardComponent],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  savedCards$!: Observable<CatalogCard[]>;
  savedCardsAll: CatalogCard[] = [];
  constructor(private cardService: CatalogCardHttpService) {}

  ngOnInit() {
    this.loadSavedCards();
  }

  onCardDeleted(id: number) {
    const index = this.savedCardsAll.findIndex(card => card.id === id);
    if (index !== -1) {
      this.savedCardsAll.splice(index, 1);
    }
  }

  private loadSavedCards() {
    this.savedCards$ = this.cardService.getAllSavedMicroskill();
    this.savedCards$.subscribe(res => {
      this.savedCardsAll = res;
      this.savedCardsAll.forEach(card => {
        card.isSaved = true;
      });
    });
  }
}
