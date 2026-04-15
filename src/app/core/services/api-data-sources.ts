import { Injectable } from '@angular/core';
import {getApiUrl} from '../utils/request';
import {HttpClient} from '@angular/common/http';
import {PageState} from '../models/request-params';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../models/paginated-response';
import {cleanParams} from '../utils/helpers';
import {DataSource, DataSourceFilters} from '../models/data-source';

@Injectable({
  providedIn: 'root',
})
export class ApiDataSources {
    private readonly url = getApiUrl('data-sources');

    constructor(private http: HttpClient) {
    }

    getAll(
        page: PageState,
        filters: DataSourceFilters,
    ): Observable<PaginatedResponse<DataSource>> {
        return this.http
            .get<PaginatedResponse<DataSource>>(
                this.url, {params: {...page, ...cleanParams(filters)}}
            );
    }

    getAllNoPag(
        filters: DataSourceFilters,
    ): Observable<DataSource[]> {
        return this.http
            .get<DataSource[]>(
                `${this.url}/all`, {params: cleanParams(filters)}
            );
    }
}
