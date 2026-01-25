import {Component, EventEmitter, model, Output} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MenuItem} from '../../core/utils/menu-item';
import {Auth} from '../../core/services/auth';
import {Alert} from '../../core/services/alert';

@Component({
  selector: 'app-topbar',
    imports: [
        MatButton,
        MatIcon,
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive,
        MatIconButton
    ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
    menuItems = [
        new MenuItem(
            "About",
            "info",
            "/about"
        )
    ]
    @Output() menuClick = new EventEmitter<void>();

    constructor(
        private auth: Auth,
        private router: Router,
        private alert: Alert
    ) {}

    logout(): void {
        this.auth.logout();
        this.alert.success('Logged out successfully');

        this.router.navigate(['/login']);
    }

    toggleSidebar(): void {
        this.menuClick.emit();
    }
}
