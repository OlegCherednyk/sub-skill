import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { base_url } from '../core_variables';
import { CatalogCard, CatalogCardsData } from '../interfaces/catalog';

@Injectable({
  providedIn: 'root',
})
export class CatalogCardService {
  private cachedCatalogCards$: Observable<CatalogCard[]>;

  constructor(private _httpClient: HttpClient) {
    this.cachedCatalogCards$ = this.fetchCatalogCards();
  }

  private fetchCatalogCards(): Observable<CatalogCard[]> {
    console.log('Fetching data from server');
    return this._httpClient
      .get<CatalogCardsData>(`${base_url}microskill/all-paging`)
      .pipe(
        map(data => data.content),
        // add base64 prefix to images
        map(cards =>
          cards.map(card => ({
            ...card,
            photo: `data:image/jpeg;base64,${card.photo}`,
          }))
        ),
        tap(cards => {
          console.log('Fetched data and stored in cache:', cards);
        }),
        shareReplay(1)
      );
  }

  public getCatalogCardsData(): Observable<CatalogCard[]> {
    return this.cachedCatalogCards$;
  }
}
