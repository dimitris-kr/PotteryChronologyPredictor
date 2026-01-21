import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';
import {Alert} from '../services/alert';

export const authReverseGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const alert = inject(Alert);

    if (auth.isLoggedIn()) {
        // ✅ User is already logged in → redirect to admin
        router.navigate(['/admin']);
        // alert.info('You are already logged in.');
        return false;
    }

    // ✅ Not logged in → allow access
    return true;
};
