import {Routes} from '@angular/router';
import {PublicLayout} from './layouts/public-layout/public-layout';
import {About} from './public/about/about';
import {Login} from './public/login/login';
import {Dashboard} from './admin/dashboard/dashboard';
import {AdminLayout} from './layouts/admin-layout/admin-layout';
import {authGuard} from './core/guards/auth-guard';
import {authReverseGuard} from './core/guards/auth-reverse-guard';

export const routes: Routes = [
    /* Public layout */
    {
        path: '',
        canActivate: [authReverseGuard],
        component: PublicLayout,
        children: [
            {
                path: '',
                redirectTo: 'about',
                pathMatch: 'full'
            },
            {
                path: 'about',
                component: About, // home
            },
            {
                path: 'login',
                component: Login,
            },

        ],
    },

    /* Admin layout */
    {
        path: 'admin',
        canActivate: [authGuard],
        component: AdminLayout,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'about',
                component: About,
            },
            /*{
                path: 'feature-a',
                loadComponent: () =>
                    import('./admin/feature-a/feature-a.component')
                        .then(m => m.FeatureAComponent),
            },*/
        ],
    },

    /* Fallback */
    {
        path: '**',
        redirectTo: '',
    },
];
