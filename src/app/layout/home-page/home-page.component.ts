import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from 'src/app/features/catalog/catalog.component';
import { BannerComponent } from './banner/banner.component';
import { PopularCategoriesComponent } from 'src/app/shared/components/popular-categories/popular-categories.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    CatalogComponent,
    BannerComponent,
    PopularCategoriesComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
