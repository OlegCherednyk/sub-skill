import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTrackComponent } from '../../home-page/card-track/card-track.component';
import { HomeTrackCategories } from 'src/app/core/interfaces/home-page';

@Component({
  selector: 'app-might-like',
  standalone: true,
  imports: [CommonModule, CardTrackComponent],
  templateUrl: './might-like.component.html',
  styleUrls: ['./might-like.component.scss'],
})
export class MightLikeComponent {
  public categories = HomeTrackCategories;
}
