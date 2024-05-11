import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-my-skill-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skill-card.component.html',
  styleUrls: ['./my-skill-card.component.scss'],
})
export class MySkillCardComponent {
  @Input() public card!: CatalogCard;
}
