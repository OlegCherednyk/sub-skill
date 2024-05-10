import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notloggedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const source = route.data['source'];

  authService.setRedirectUrl(state.url);
  if (authService.logged()) {
    return true;
  } else {
    return router.createUrlTree(['/not-logged-page', source]);
  }
};
