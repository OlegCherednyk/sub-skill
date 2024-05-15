import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CatalogCategory } from '../interfaces/categories-side-bar';
import {
  CatalogCard,
  CatalogCardsData,
  CatalogCategoryCardsData,
} from '../interfaces/catalog';
import { base_url } from '../core_variables';

@Injectable({
  providedIn: 'root',
})
export class CatalogCategoriesService {
  constructor(private _httpClient: HttpClient) {}

  public getCategories(): Observable<CatalogCategory[]> {
    console.log(
      this._httpClient.get<CatalogCategory>(
        'https://subskill.onrender.com/api/v1/profession/all'
      )
    );
    return this._httpClient.get<CatalogCategory[]>(
      'https://subskill.onrender.com/api/v1/profession/all'
    );
  }

  public getProfessionTechnologies(
    name: string
  ): Observable<CatalogCategory[]> {
    if (name === 'all') {
      return this._httpClient.get<CatalogCategory[]>(
        `${base_url}technology/all`
      );
    }
    return this._httpClient.get<CatalogCategory[]>(
      `${base_url}technology/profession/${name}`
    );
  }

  public getCategoryCards(id: string): Observable<CatalogCard[]> {
    console.log('ID:', id);

    if (id === 'all') {
      console.log('getCategoryCards ALL');
      return this._httpClient
        .get<CatalogCardsData>(`${base_url}microskill/all-paging?size=20`)
        .pipe(
          map(data => data.content),
          // add base64 prefix to images
          map(cards =>
            cards.map(card => ({
              ...card,
              photo: `data:image/jpeg;base64,${card.photo}`,
            }))
          )
        );
    } else {
      console.log('getCategoryCards NAME');
      return this._httpClient
        .get<CatalogCategoryCardsData>(`${base_url}technology/id/${id}`)
        .pipe(
          map(data => data.microSkills),
          // add base64 prefix to images
          map(cards =>
            cards.map(card => ({
              ...card,
              photo: `data:image/jpeg;base64,${card.photo}`,
            }))
          )
        );
    }
  }
}
