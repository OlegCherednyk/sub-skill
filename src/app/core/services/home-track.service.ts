import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogCard, CatalogCardsData } from '../interfaces/catalog';
import { Observable, map } from 'rxjs';
import { base_url } from '../core_variables';

@Injectable({
  providedIn: 'root'
})
export class HomeTrackService {

  constructor(private _httpClient: HttpClient) { }

  public getTrack(size: number, categories: string): Observable<CatalogCard[]> {
    return this._httpClient
      .get<CatalogCardsData>(`${base_url}microskill/${categories}?size=${size}`)
      .pipe(
        map(data => data.content),
        map(cards =>
          cards.map(card => ({
            ...card,
            photo: `data:image/jpeg;base64,${card.photo}`,
          }))
        )
      )
  }

  public getCountOfPages(): Observable<number> {
    return this._httpClient
      .get<CatalogCardsData>(`${base_url}microskill/all-paging`)
      .pipe(
        map(data => data.totalPages)
      )
  }
}
