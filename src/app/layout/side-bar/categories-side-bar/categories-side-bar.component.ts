import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSideBarComponent } from '../icon-side-bar/icon-side-bar.component';
import { Icon } from 'src/app/core/interfaces/icon';
import { CategoriesSideBar } from 'src/app/core/interfaces/categories-side-bar';

@Component({
  selector: 'categories-side-bar',
  standalone: true,
  imports: [CommonModule, IconSideBarComponent],
  templateUrl: './categories-side-bar.component.html',
  styleUrls: ['./categories-side-bar.component.scss']
})
export class CategoriesSideBarComponent {
  public categoryIcon: Icon = {
    img: 'url(../../../assets/icons/apps.svg)',
    title: 'Categories'
  }

  public categories: CategoriesSideBar = {
    'Html': false,
    'CSS': false,
    'Design': false,
    'Java': false,
    'Python': false,
    'QA': false,
    'Tools': false
  }

  public changeCategoryValue = (category: string):void => {
    this.categories[category] = !this.categories[category]
    console.log(this.categories)
  }

  public categorySelected = (category: string):object => {
    if(this.categories[category]) {
      return {
        backgroundColor: 'rgba(83, 230, 62, 0.10)',
        color: '#53CA3E'
      }
    }
    return {}
  }
}
