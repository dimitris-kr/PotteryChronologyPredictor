import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth-interceptor';
import {loaderInterceptor} from './core/interceptors/loader-interceptor';
import {errorInterceptor} from './core/interceptors/error-interceptor';

// Echarts
import { provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    PieChart,
    TooltipComponent,
    LegendComponent,
    CanvasRenderer,
]);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor, loaderInterceptor, errorInterceptor]),
        ),
        provideEchartsCore({echarts})
    ]
};
