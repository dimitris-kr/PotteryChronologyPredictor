import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';
import {Router} from '@angular/router';
import {Alert} from '../services/alert';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const auth = inject(Auth);
    const router = inject(Router);
    const alert = inject(Alert);

    // Attach token if it exists
    const token = auth.token;

    const authReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
        : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401) {
                auth.logout();
                alert.error('Session expired. Please log in again.');
                router.navigate(['/login'], {
                    queryParams: { returnUrl: router.url },
                });
            }

            return throwError(() => error);
        })
    );
};
