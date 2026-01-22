import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';
import {Alert} from '../services/alert';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const alert = inject(Alert);

    if (auth.isLoggedIn()) {
        return true;
    }

    // Not authenticated
    auth.logout();
    alert.error('Please log in to continue');
    router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
    });

    return false;
};
