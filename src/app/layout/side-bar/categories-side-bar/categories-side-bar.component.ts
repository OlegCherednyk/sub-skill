import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSideBarComponent } from '../icon-side-bar/icon-side-bar.component';
import { Icon } from 'src/app/core/interfaces/icon';
import { CatalogCategory} from 'src/app/core/interfaces/categories-side-bar';
import { CatalogCategoriesService } from 'src/app/core/services/catalog-categories.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'categories-side-bar',
    standalone: true,
    imports: [CommonModule, IconSideBarComponent, RouterModule],
    templateUrl: './categories-side-bar.component.html',
    styleUrls: ['./categories-side-bar.component.scss']
})
export class CategoriesSideBarComponent {

    private CategoriesService = inject(CatalogCategoriesService);

    public categoryIcon: Icon = {
        img: 'url(../../../assets/icons/apps.svg)',
        title: 'Categories'
    }

    public categories: Observable<CatalogCategory[]> = this.CategoriesService.getCategories();
}
