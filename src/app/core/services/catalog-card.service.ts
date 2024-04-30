import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { base_url } from '../core_variables';
import {
  CatalogCard,
  CatalogCardsData,
  SavedMicroSkill,
} from '../interfaces/catalog';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogCardService {}
