import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem} from '../../core/utils/menu-item';

@Component({
  selector: 'app-sidebar',
    imports: [
        NgOptimizedImage,
        MatButton,
        MatIcon,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
    mainMenuItems = [
        new MenuItem(
            "Dashboard",
            "dashboard",
            "/dashboard",
        ),
        new MenuItem(
            "Pottery Data",
            "folder",
            "/data",
        ),
        new MenuItem(
            "Predictive Models",
            "memory",
            "/models",
        ),
        new MenuItem(
            "Predictions",
            "auto_awesome",
            "/predictions",
        )
    ];

    secondaryMenuItems = [
        new MenuItem(
            "About",
            "info",
            "/about"
        )
    ];
}
