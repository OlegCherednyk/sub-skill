import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTrackService } from 'src/app/core/services/home-track.service';
import { Observable } from 'rxjs';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { CatalogCardComponent } from 'src/app/shared/components/catalog-card/catalog-card.component';
import { CatalogHorizontalCardComponent } from 'src/app/shared/components/catalog-horizontal-card/catalog-horizontal-card.component';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'card-track',
  standalone: true,
  imports: [CommonModule, CatalogCardComponent, CatalogHorizontalCardComponent],
  templateUrl: './card-track.component.html',
  styleUrls: ['./card-track.component.scss'],
})
export class CardTrackComponent implements OnInit {
  trackService = inject(HomeTrackService);

  trackCards$!: Observable<CatalogCard[]>;
  trackCardsAll: CatalogCard[] = [];
  @Input() typeOfTrack!: string;
  @Input() countOfPages: number = 4;
  @Input() pageSize: number = 4;
  @Input() title: string = '';
  @Input() typeOfCard: string = 'standart';
  public currentPage: number = 1;
  constructor(
    private cardHttpService: CatalogCardHttpService,
    private eventService: EventService
  ) {}
  savedCards$!: Observable<CatalogCard[]>;
  savedCardsAll: CatalogCard[] = [];
  isSaved: boolean = false;
  ngOnInit(): void {
    this.subscribeToModalEvent();
    this.loadData();
  }
  private subscribeToModalEvent(): void {
    this.eventService.modalForHomeEvent$.subscribe(() => {
      this.loadData();
    });
  }
  loadData(): void {
    if (localStorage.getItem('token')) {
      this.trackService
        .getTrack(this.pageSize * this.countOfPages, this.typeOfTrack)
        .subscribe(trackCards => {
          this.trackCardsAll = trackCards;
          this.cardHttpService.getAllSavedMicroskill().subscribe(savedCards => {
            savedCards.forEach(savedCard => {
              const foundCard = this.trackCardsAll.find(
                trackCard => trackCard.id === savedCard.id
              );
              if (foundCard) {
                foundCard.isSaved = true;
              }
            });
          });
        });
    } else {
      this.trackCards$ = this.trackService.getTrack(
        this.pageSize * this.countOfPages,
        this.typeOfTrack
      );
      this.trackCards$.subscribe(res => {
        this.trackCardsAll = res;
      });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.countOfPages) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = this.countOfPages;
    }
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
