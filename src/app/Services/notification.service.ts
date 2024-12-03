import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar) { }

    showNotification(message: string, action: string = 'Ok', panelClass: string = ''): void {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: panelClass,
        });
    }

    showSuccess(message: string): void {
        this.showNotification(message, 'Ok', 'success-snack');
    }

    showInfo(message: string): void {
        this.showNotification(message, 'Ok', 'info-snack');
    }

    showError(message: string): void {
        this.showNotification(message, 'Ok', 'error-snack');
    }
}
