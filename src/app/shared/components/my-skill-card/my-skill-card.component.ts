import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-my-skill-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, StarRatingComponent],
  templateUrl: './my-skill-card.component.html',
  styleUrls: ['./my-skill-card.component.scss'],
})
export class MySkillCardComponent {
  @Input() public card!: CatalogCard;
  // @Output() cardDeleted: EventEmitter<number> = new EventEmitter<number>();
  // removeFromMySkills(id: number): void {
  //   this.cardDeleted.emit(id);
  // }
}
