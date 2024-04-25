import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goback.component.html',
  styleUrls: ['./goback.component.scss'],
})
export class GobackComponent {
  goBack(): void {
    window.history.back();
  }
}
