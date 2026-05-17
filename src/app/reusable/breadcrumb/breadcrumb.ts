import {Component, computed, inject, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Breadcrumb as BreadcrumbService} from '../../core/services/breadcrumb';
import {capitalize} from '../../core/utils/helpers';

@Component({
  selector: 'app-breadcrumb',
    imports: [
        RouterLink,
        MatIcon,
        MatButton
    ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
    private router = inject(Router);
    private breadcrumbService = inject(BreadcrumbService);

    private url = signal<string>(this.router.url);

    crumbs = computed(() => this.buildCrumbs(this.url(), this.breadcrumbService.labels()));

    constructor() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(e => this.url.set((e as NavigationEnd).urlAfterRedirects));
    }

    private buildCrumbs(
        url: string,
        customLabels: Record<string, string>,
    ): { label: string; url: string }[] {
        const segments = url.split('?')[0].split('/').filter(Boolean);

        const staticLabels: Record<string, string> = {
            admin: 'Dashboard',
            data: 'Pottery Data',
            models: 'Predictive Models',
        };

        const crumbs: { label: string; url: string }[] = [];
        let path = '';

        for (const seg of segments) {
            path += '/' + seg;

            if (seg === 'dashboard') continue;

            // Custom label set by a page, keyed by full path
            if (customLabels[path]) {
                crumbs.push({ label: customLabels[path], url: path });
                continue;
            }

            if (/^\d+$/.test(seg)) {
                crumbs.push({ label: `#${seg}`, url: path });
                continue;
            }

            crumbs.push({ label: staticLabels[seg] ?? capitalize(seg), url: path });
        }

        return crumbs;
    }
}
