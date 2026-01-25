import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../../reusable/sidebar/sidebar';
import {Topbar} from '../../reusable/topbar/topbar';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-layout',
    imports: [
        RouterOutlet,
        Sidebar,
        Topbar,
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent
    ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
    protected readonly isMobile = signal(true);

    private readonly _mobileQuery: MediaQueryList;
    private readonly _mobileQueryListener: () => void;

    constructor() {
        const media = inject(MediaMatcher);

        this._mobileQuery = media.matchMedia('(max-width: 767px)');
        this.isMobile.set(this._mobileQuery.matches);
        this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
        this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }
}
