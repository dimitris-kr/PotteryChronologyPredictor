import {Injectable, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Breadcrumb {
    private customLabels = signal<Record<string, string>>({});

    readonly labels = this.customLabels.asReadonly();

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => this.customLabels.set({}));
    }

    /** Override the label for a specific URL path. */
    setLabel(path: string, label: string) {
        this.customLabels.update(current => ({ ...current, [path]: label }));
    }
}
