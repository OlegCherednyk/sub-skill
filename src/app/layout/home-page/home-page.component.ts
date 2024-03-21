import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from 'src/app/features/catalog/catalog.component';
import { BannerComponent } from './banner/banner.component';
import { CardTrackComponent } from './card-track/card-track.component';
import { HomeTrackCategories } from 'src/app/core/interfaces/home-page'

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, CatalogComponent, BannerComponent, CardTrackComponent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    public categories = HomeTrackCategories; 
    
}
