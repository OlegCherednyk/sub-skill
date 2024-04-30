import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { bookmarkGuard } from './core/guards/bookmark.guard';

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
  },
  // {
  //   path: 'auth/register',
  //   loadComponent: () =>
  //     import('./auth/signup/signup.component').then(m => m.SignupComponent),
  // },
  {
    path: 'profile',
    loadComponent: () =>
      import('./auth/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },

  {
    path: 'signup-page',
    loadComponent: () =>
      import('./auth/signup-page/signup-page.component').then(
        m => m.SignupPageComponent
      ),
  },
  // {
  //   path: 'my-skills',
  //   loadComponent: () =>
  //     import('./').then(m => m.), // тут буде щлях до компоненту my-skills
  // },
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./layout/bookmarks/bookmarks.component').then(
        m => m.BookmarksComponent
      ),
    canActivate: [bookmarkGuard],
  },
  {
    path: 'not-logged-page',
    loadComponent: () =>
      import(
        './layout/bookmarks/not-logged-page/not-logged-page.component'
      ).then(m => m.NotLoggedPageComponent),
  },
];
