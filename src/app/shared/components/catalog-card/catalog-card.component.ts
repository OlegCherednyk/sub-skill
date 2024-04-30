import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CatalogCard } from 'src/app/core/interfaces/catalog';
import { TruncateDirective } from 'src/app/shared/directives/truncate.directive';
import { Router, RouterModule } from '@angular/router';
import { CatalogCardHttpService } from 'src/app/core/services/catalog-card-http.service';

@Component({
  selector: 'catalog-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, TruncateDirective, RouterModule],
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogCardComponent {
  @Input() public card!: CatalogCard;
  public hoverIcon: boolean = false;
  public clickedIcon: boolean = false;
  @Output() cardDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private cardHttpService: CatalogCardHttpService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public toggleSaves(event: Event, id: number): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/not-logged-page']);
    }
    event.stopPropagation();
    if (this.card.isSaved) {
      this.card.isSaved = !this.card.isSaved;
      this.cardHttpService.removeMicroskillById(this.card.id).subscribe();
      this.cardDeleted.emit(id);
      this.cdr.detectChanges();
    } else {
      this.cdr.detectChanges();
      this.card.isSaved = !this.card.isSaved;
      this.cardHttpService.saveMicroskillById(this.card.id).subscribe();
    }
  }
}
