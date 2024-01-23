import { Component } from '@angular/core';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { SocialButtonComponent } from './social-button/social-button.component';
import { CommonModule } from '@angular/common';
import { Icons } from 'src/app/core/interfaces/icon';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule,
    SubscribeFormComponent, SocialButtonComponent],
})
export class FooterComponent {
  public icons: Icons = {
    instagram: {
      img: 'assets/icons/instagram.svg',
      color: '#F56040',
      title: 'Instagram',
    },
    telegram: {
      img: 'assets/icons/telegram.svg',
      color: '#0088CC',
      title: 'Telegram',
    },
    youtube: {
      img: 'assets/icons/youtube.svg',
      color: '#FF0000',
      title: 'YouTube',
    },
    facebook: {
      img: 'assets/icons/facebook.svg',
      color: '#3B5998',
      title: 'Facebook',
    },
    tiktok: {
      img: 'assets/icons/tiktok.svg',
      color: '#000000',
      title: 'TikTok',
    },
  };
}
