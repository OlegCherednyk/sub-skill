import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CatalogCardService } from 'src/app/core/services/catalog-card.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-product-horizontal-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, ButtonComponent],
  templateUrl: './product-horizontal-card.component.html',
  styleUrls: ['./product-horizontal-card.component.scss'],
})
export class ProductHorizontalCardComponent {
  @Input() public product!: CatalogCard;
  public hoverIcon: boolean = false;
  public clickedIcon: boolean = false;

  public addToSaves(): void {
    this.clickedIcon = !this.clickedIcon;
    console.log(this.clickedIcon);
  }

  public hoverActive(): void {
    this.hoverIcon = true;
  }

  public hoverDisable(): void {
    this.hoverIcon = this.clickedIcon ? true : false;
  }
}
