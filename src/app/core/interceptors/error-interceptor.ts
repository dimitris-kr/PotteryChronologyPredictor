import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Alert} from '../services/alert';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const alert = inject(Alert);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            // Let authInterceptor handle this
            if (error.status === 401) {
                return throwError(() => error);
            }

            // Extract message safely
            let message =
                error.error?.detail ||
                error.error?.message ||
                error.message ||
                'Something went wrong';

            if (Array.isArray(message)) {
                message = message[0].msg;
            }
            alert.error(message);

            return throwError(() => error);
        })
    );
};
