import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularCategoriesService } from 'src/app/core/services/popular-categories.service';
import { PopularCategory } from 'src/app/core/interfaces/popular-category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss'],
})
export class PopularCategoriesComponent {
  public popularCategories$!: Observable<PopularCategory[]>;
  public activeCategory: PopularCategory | null = null;
  constructor(private popularCategoriesService: PopularCategoriesService) {}

  ngOnInit(): void {
    this.popularCategories$ =
      this.popularCategoriesService.fetchPopularCategories();
  }
  repeatedCategories(
    categories: PopularCategory[],
    targetCount: number
  ): any[] {
    const repeated = [];
    for (let i = 0; i < targetCount; i++) {
      repeated.push(categories[i % categories.length]);
    }
    return repeated;
  }
  setActiveCategory(category: PopularCategory): void {
    this.activeCategory = category;
  }

  isActiveCategory(category: PopularCategory): boolean {
    return this.activeCategory === category;
  }
}
