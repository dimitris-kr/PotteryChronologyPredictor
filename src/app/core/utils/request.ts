import {environment} from '../../../environments/environment';

export function getApiUrl(route: string = ''): string {
    return environment.apiUrl + '/' + route;
}
