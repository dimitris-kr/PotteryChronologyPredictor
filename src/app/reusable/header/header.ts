import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MenuItem} from '../../core/utils/menu-item';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
    imports: [
        NgOptimizedImage,
        MatButton,
        RouterLink,
        RouterLinkActive,
        MatIcon
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    menuItems = [
        new MenuItem(
            "About",
            "info",
            "/about"
        )
    ]
}
