import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { base_url } from '../core_variables';
import { PopularCategory } from '../interfaces/popular-category';

@Injectable({
  providedIn: 'root',
})
export class PopularCategoriesService {
  constructor(private _httpClient: HttpClient) {}

  public fetchPopularCategories(): Observable<PopularCategory[]> {
    console.log('Fetching PopularCategories from server');

    return this._httpClient
      .get<PopularCategory[]>(`${base_url}profession/all`)
      .pipe(
        tap(data => {
          console.log('Fetched:', data);
        })
      );
  }
}
