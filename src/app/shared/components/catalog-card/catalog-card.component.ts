import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { TruncateDirective } from 'src/app/shared/directives/truncate.directive';

@Component({
    selector: 'catalog-card',
    standalone: true,
    imports: [CommonModule, StarRatingComponent, TruncateDirective],
    templateUrl: './catalog-card.component.html',
    styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent {
    @Input() public card!: CatalogCard;

    public hoverIcon: boolean = false;
    public clickedIcon: boolean = false;

    public addToSaves(): void {
        this.clickedIcon = !this.clickedIcon
        console.log(this.clickedIcon)
    }

    public hoverActive(): void {
        this.hoverIcon = true;
    }

    public hoverDisable(): void {
        this.hoverIcon = this.clickedIcon? true: false;
    }
}
