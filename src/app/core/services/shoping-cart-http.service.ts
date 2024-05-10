import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, tap } from 'rxjs';
import { base_url } from '../core_variables';
import { CatalogCard, ShopingCart } from '../interfaces/catalog';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ShopingCartHttpService {
  constructor(
    private _httpClient: HttpClient,
    private httpErrorService: HttpErrorService
  ) {}
  createHeaders(): Record<string, string> {
    const authToken = localStorage.getItem('token') as string;
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }
  public getAllForOrderingCards(): Observable<CatalogCard[]> {
    console.log('HTTP getAllForOrderingCards');
    const authToken = localStorage.getItem('token') as string;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    return this._httpClient
      .get<CatalogCard[]>(`${base_url}cart/all`, { headers })
      .pipe(
        map(cards =>
          cards.map(card => ({
            ...card,
            photo: `data:image/jpeg;base64,${card.photo}`,
          }))
        ),
        shareReplay(1),
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<any>(err, 'deleteUser')
        )
      );
  }
  public saveCardForOrderingById(
    microskillId: number
  ): Observable<ShopingCart> {
    console.log('saveCardForOrderingById', microskillId);
    const authToken = localStorage.getItem('token') as string;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (authToken) {
      console.log('authToken', authToken);
    }
    return this._httpClient
      .post<ShopingCart>(
        `${base_url}cart/add/${microskillId}`,
        {},
        {
          headers: this.createHeaders(),
        }
      )
      .pipe(
        map(data => ({
          ...data,
          listOfMicroSkills: data.listOfMicroSkills.map(item => ({
            ...item,
            photo: `data:image/jpeg;base64,${item.photo}`,
          })),
        })),
        tap(data => console.log(data)),
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<any>(err, 'deleteUser')
        )
      );
  }
  removeCardForOrderingById(id: number) {
    console.log('HTTP removeCardForOrderingById');
    const authToken = localStorage.getItem('token') as string;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    return this._httpClient
      .delete<CatalogCard>(`${base_url}cart/delete/${id}`, {
        headers,
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<any>(err, 'deleteUser')
        )
      );
  }
}
