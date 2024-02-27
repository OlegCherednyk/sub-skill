import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { base_url } from '../core_variables';
import { CatalogCard, CatalogCards } from '../interfaces/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogCartService {

  constructor(private _httpClient: HttpClient) { }

  public getCatalogCarts(): Observable<[CatalogCard]> {
    return this._httpClient.get<CatalogCards>(`${base_url}microskill/all`)
    .pipe(
      map(carts => carts.content)
    );
  }

}
