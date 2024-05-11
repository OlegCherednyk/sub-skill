import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { base_url } from '../core_variables';
import { PopularCategory } from '../interfaces/popular-category';

@Injectable({
  providedIn: 'root',
})
export class PopularCategoriesService {
  private popularCategories!: PopularCategory[];
  private categoryTitleSubject = new BehaviorSubject<string>('');
  categoryTitle$ = this.categoryTitleSubject.asObservable();
  constructor(private _httpClient: HttpClient) {}

  public fetchPopularCategories(): Observable<PopularCategory[]> {
    return this._httpClient
      .get<PopularCategory[]>(`${base_url}profession/all`)
      .pipe(
        tap(data => {
          this.popularCategories = data;
        })
      );
  }
  getCategoryById(categoryId: number): PopularCategory | undefined {
    return this.popularCategories.find(category => category.id === categoryId);
  }

  setCategoryTitle(title: string) {
    this.categoryTitleSubject.next(title);
  }

  getCategoryTitle(): string {
    return this.categoryTitleSubject.getValue();
  }
}
