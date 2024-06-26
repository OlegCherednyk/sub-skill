import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { notloggedGuard } from './core/guards/not-logged.guard';

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
      import('./layout/shoping-cart/shoping-cart.component').then(
        m => m.ShopingCartComponent
      ),
    canActivate: [notloggedGuard],
    data: {
      source: 'cart',
    },
  },
  {
    path: 'product-card/:id',
    loadComponent: () =>
      import('./layout/product-card/product-card.component').then(
        m => m.ProductCardComponent
      ),
  },
  {
    path: 'catalog-cards/:name',
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

  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./layout/bookmarks/bookmarks.component').then(
        m => m.BookmarksComponent
      ),
    canActivate: [notloggedGuard],
    data: {
      source: 'bookmarks',
    },
  },
  {
    path: 'not-logged-page/:source',
    loadComponent: () =>
      import(
        './shared/components/not-logged-page/not-logged-page.component'
      ).then(m => m.NotLoggedPageComponent),
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./layout/order/order.component').then(m => m.OrderComponent),
    canActivate: [notloggedGuard],
    data: {
      source: 'order',
    },
  },
  {
    path: 'my-skills',
    loadComponent: () =>
      import('./layout/my-skills/my-skills.component').then(
        m => m.MySkillsComponent
      ),
    canActivate: [notloggedGuard],
    data: {
      source: 'my-skills',
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/not-found-page/not-found-page.component'
      ).then(m => m.NotFoundPageComponent),
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import(
        './shared/components/server-error-page/server-error-page.component'
      ).then(m => m.ServerErrorPageComponent),
  },
];
