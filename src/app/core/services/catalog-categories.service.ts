import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogCategory } from '../interfaces/categories-side-bar';

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
}
