import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, tap } from 'rxjs';
import { base_url } from '../core_variables';
import { CatalogCard, CatalogCardsData } from '../interfaces/catalog';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogCardHttpService {
  private cachedCatalogCards$: Observable<CatalogCard[]>;
  savedCards: any[] = [];
  constructor(
    private _httpClient: HttpClient,
    private httpErrorService: HttpErrorService
  ) {
    this.cachedCatalogCards$ = this.fetchCatalogCards();
  }
  authToken = localStorage.getItem('token') as string;

  createHeaders(): Record<string, string> {
    const authToken = localStorage.getItem('token') as string;
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }

  getFavoriteCards(): any[] {
    return this.savedCards;
  }

  private fetchCatalogCards(): Observable<CatalogCard[]> {
    console.log('fetchCatalogCards');
    return this._httpClient
      .get<CatalogCard[]>(`${base_url}microskill/all`)
      .pipe(
        // map(data => data.content),
        // add base64 prefix to images
        map(cards =>
          cards.map(card => ({
            ...card,
            photo: `data:image/jpeg;base64,${card.photo}`,
          }))
        ),
        shareReplay(1)
      );
  }

  public getCatalogCardsData(): Observable<CatalogCard[]> {
    return this.cachedCatalogCards$;
  }

  public getCardById(id: number): Observable<CatalogCard> {
    return this._httpClient
      .get<CatalogCard>(`${base_url}microskill/find-by-id/${id}`)
      .pipe(
        map(data => ({
          ...data,
          photo: `data:image/jpeg;base64,${data.photo}`,
        })),
        shareReplay(1)
      );
  }

  public saveMicroskillById(microskillId: number): Observable<CatalogCard> {
    console.log('saveMicroskillById', microskillId);
    const authToken = localStorage.getItem('token') as string;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (authToken) {
      console.log('authToken', authToken);
    }
    return this._httpClient
      .post<CatalogCard>(
        `${base_url}savemicroSkill/add/${microskillId}`,
        {},
        {
          headers: this.createHeaders(),
        }
      )
      .pipe(
        map(data => ({
          ...data,
          photo: `data:image/jpeg;base64,${data.photo}`,
        })),
        tap(data => console.log(data)),
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<any>(err, 'deleteUser')
        )
      );
  }
  public getAllSavedMicroskill(): Observable<CatalogCard[]> {
    console.log('HTTP getAllSavedMicroskill');
    const authToken = localStorage.getItem('token') as string;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    return this._httpClient
      .get<CatalogCard[]>(`${base_url}savemicroSkill/all`, { headers })
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
  removeMicroskillById(id: number) {
    console.log('HTTP removeMicroskillById');
    const authToken = localStorage.getItem('token') as string;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    return this._httpClient
      .delete<CatalogCard>(`${base_url}savemicroSkill/delete/${id}`, {
        headers,
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<any>(err, 'deleteUser')
        )
      );
  }
}
