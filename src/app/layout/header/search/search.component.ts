import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {
  keyword = "";
  onInputChange(keyword: string) {
    if (keyword.length >= 2) {
    console.log("keyword", keyword);
    }
}

}
