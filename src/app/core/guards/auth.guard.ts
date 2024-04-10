
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.setRedirectUrl(state.url);
  if (authService.logged()) {
    return true; 
  } else {
    return router.createUrlTree(['/signup-page']);
  }
};
