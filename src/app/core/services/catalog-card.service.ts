import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { base_url } from '../core_variables';
import { CatalogCard, CatalogCardsData } from '../interfaces/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogCardService {

  constructor(private _httpClient: HttpClient) { }

  public getCatalogCardsData(): Observable<CatalogCard[]> {
    return this._httpClient.get<CatalogCardsData>(`${base_url}microskill/all`)
    .pipe(
      map(data => data.content),
      // add base64 prefix to images
      map(cards => cards.map(card => ({...card, photo: `data:image/jpeg;base64,${card.photo}`})))
    );
  }
}
