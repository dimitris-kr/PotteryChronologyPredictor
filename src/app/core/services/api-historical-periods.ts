import {Injectable} from '@angular/core';
import {getApiUrl} from '../utils/request';
import {HttpClient} from '@angular/common/http';
import {PageState, RequestParams} from '../models/request-params';
import {HistoricalPeriod, HistoricalPeriodFilters} from '../models/historical-period';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../models/paginated-response';
import {cleanParams} from '../utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class ApiHistoricalPeriods {
    private readonly url = getApiUrl('historical-periods');

    constructor(private http: HttpClient) {
    }

    getAll(
        page: PageState,
        filters: HistoricalPeriodFilters,
    ): Observable<PaginatedResponse<HistoricalPeriod>> {
        return this.http
            .get<PaginatedResponse<HistoricalPeriod>>(
                this.url, {params: {...page, ...cleanParams(filters)}}
            );
    }

    getAllNoPag(
        filters: HistoricalPeriodFilters,
    ): Observable<HistoricalPeriod[]> {
        return this.http
            .get<HistoricalPeriod[]>(
                `${this.url}/all`, {params: cleanParams(filters)}
            );
    }
}
