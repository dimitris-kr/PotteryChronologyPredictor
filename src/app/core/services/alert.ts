import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

export type AlertType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class Alert {
    constructor(private snackBar: MatSnackBar) {}

    show(message: string, type: AlertType = 'info'): void {
        this.snackBar.open(message, 'Close', {
            duration: 10000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: [`alert-${type}`],
        });
    }

    success(message: string) {
        this.show(message, 'success');
    }

    error(message: string) {
        this.show(message, 'error');
    }

    info(message: string) {
        this.show(message, 'info');
    }
}
