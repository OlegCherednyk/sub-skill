import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/home-page/home-page.component').then(
        m => m.HomePageComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/catalog/catalog.component').then(
        // тут буде щлях до компоненту корзини
        m => m.CatalogComponent // тут буде компонент корзини
      ),
  },
  {
    path: 'product-card/:id',
    loadComponent: () =>
      import('./layout/product-card/product-card.component').then(
        m => m.ProductCardComponent
      ),
  },
  {
    path: 'catalog-cards/:id',
    loadComponent: () =>
      import('./features/catalog/catalog.component').then(
        m => m.CatalogComponent
      ),
  }
];
