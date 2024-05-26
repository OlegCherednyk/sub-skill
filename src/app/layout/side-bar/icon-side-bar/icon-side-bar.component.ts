import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Icon } from 'src/app/core/interfaces/icon';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'icon-side-bar',
  templateUrl: './icon-side-bar.component.html',
  styleUrls: ['./icon-side-bar.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSideBarComponent implements OnInit {
  @Input() public icon!: Icon;

  isIconActive: boolean = false;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  handleIconClick(icon: any): void {
    if (icon.title === 'Profile') {
      this.router.navigate(['/profile']);
    }
    if (icon.title === 'Home') {
      this.router.navigate(['']);
    }
    if (icon.title === 'Bookmarks') {
      this.router.navigate(['/bookmarks']);
    }
    if (icon.title === 'My Skills') {
      this.router.navigate(['/my-skills']);
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.router.url.split('/').pop();
        this.isIconActive = this.icon.title === path;
        if (path === '') {
          this.isIconActive = this.icon.title === 'Home';
        }
        if (path == 'signup-page') {
          this.isIconActive = this.icon.title === 'Profile';
        }
        if (path == 'profile') {
          this.isIconActive = this.icon.title === 'Profile';
        }
        if (path == 'not-logged-page') {
          this.isIconActive = this.icon.title === 'Bookmarks';
        }
        if (path == 'bookmarks') {
          this.isIconActive = this.icon.title === 'Bookmarks';
        }
        if (path == 'my-skills') {
          this.isIconActive = this.icon.title === 'My Skills';
        }
        this.cdr.detectChanges();
      });
  }
}
