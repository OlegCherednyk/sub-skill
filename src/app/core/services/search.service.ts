import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatalogCard } from '../interfaces/catalog';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private keywordSubject = new BehaviorSubject<string>('');
  public keyword$: Observable<string> = this.keywordSubject.asObservable();

  private courses: CatalogCard[] = [];

  setKeyword(keyword: string) {
    this.keywordSubject.next(keyword);
  }

  setCatalogCards(courses: CatalogCard[]) {
    this.courses = courses;
  }

  filterCourses(searchKeyword: string): CatalogCard[] {
    const trimmedKeyword = searchKeyword.trim();

    if (!trimmedKeyword) {
      return this.courses;
    }
    return this.courses.filter(course =>
      this.matchSearchKeyword(course, searchKeyword)
    );
  }

  private matchSearchKeyword(
    course: CatalogCard,
    searchKeyword: string
  ): boolean {
    const keywordsToCheck: string[] = [
      course.name,
      course.description,
      course.rating?.toString(),
      course.price?.toString(),
      course.learningTime?.toString(),
      course.level?.toString(),
      course.views?.toString(),
      ...(Array.isArray(course.tags)
        ? course.tags.map(tag => tag.toString())
        : []),
    ].map(keyword => keyword?.toLowerCase());

    return keywordsToCheck.some(
      keyword => keyword && keyword.includes(searchKeyword.toLowerCase())
    );
  }
}
