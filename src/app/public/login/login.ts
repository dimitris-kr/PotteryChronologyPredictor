import {Component} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
    selector: 'app-login',
    imports: [
        MatFormField,
        MatLabel,
        MatIcon,
        MatInput,
        MatIconButton
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    hidePassword: boolean = true;

    togglePasswordVisibility(event: MouseEvent) {
        this.hidePassword = !this.hidePassword;
        event.stopPropagation();
    }
}
