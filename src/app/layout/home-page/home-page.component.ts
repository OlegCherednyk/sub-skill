import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from 'src/app/features/catalog/catalog.component';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CatalogComponent, BannerComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

}
