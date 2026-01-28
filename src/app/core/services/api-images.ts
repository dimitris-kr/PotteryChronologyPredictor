import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getApiUrl} from '../utils/request';

@Injectable({
    providedIn: 'root',
})
export class ApiImages {
    url: string = getApiUrl('images');

    constructor(private http: HttpClient) {
    }

    getImage(path: string, size: 'thumb' | 'medium' | 'full' = 'medium'): Observable<Blob> {
        return this.http.get(
            `${this.url}/${path}`,
            {
                params: {size},
                responseType: 'blob'
            }
        );
    }
}
