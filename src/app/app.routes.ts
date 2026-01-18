import {Routes} from '@angular/router';
import {PublicLayout} from './layouts/public-layout/public-layout';
import {About} from './public/about/about';
import {Login} from './public/login/login';

export const routes: Routes = [
    /* 🔓 Public layout */
    {
        path: '',
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

    /* 🔐 Admin layout */
    /*{
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'feature-a',
                loadComponent: () =>
                    import('./admin/feature-a/feature-a.component')
                        .then(m => m.FeatureAComponent),
            },
        ],
    },*/

    /* Fallback */
    {
        path: '**',
        redirectTo: '',
    },
];
