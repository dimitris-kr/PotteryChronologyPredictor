import {Injectable} from '@angular/core';
import {getApiUrl} from '../utils/request';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
    PotteryItem,
    PotteryItemBase,
    PotteryItemFilters,
    PotteryItemSortBy,
    PotteryItemYearRange
} from '../models/pottery-item';
import {parseBackendDate} from '../utils/dates';
import {RequestParams} from '../models/request-params';
import {PaginatedResponse} from '../models/paginated-response';
import {cleanParams} from '../utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class ApiPotteryItems {
    private readonly url = getApiUrl('pottery-items');

    constructor(private http: HttpClient) {
    }

    getAll(
        params: RequestParams<PotteryItemSortBy, PotteryItemFilters>
    ): Observable<PaginatedResponse<PotteryItem>> {
        console.log(params);
        return this.http
            .get<any>(this.url, {params: {...params.page, ...params.sort, ...cleanParams(params.filters)}})
            .pipe(
                map(res => ({
                    items: res.items.map((raw: any) => this.normalize(raw)),
                    total: res.total,
                    limit: res.limit,
                    offset: res.offset,
                }))
            );
    }

    getSingle(id: number): Observable<PotteryItem> {
        return this.http
            .get(`${this.url}/${id}`)
            .pipe(map(raw => this.normalize(raw)));
    }

    searchPotteryItems(query: string): Observable<PotteryItemBase[]> {
        return this.http.get<PotteryItemBase[]>(`${this.url}/search`, {
            params: { q: query }
        })
    }

    getPotteryItemYearRange(): Observable<PotteryItemYearRange> {
        return this.http.get<PotteryItemYearRange>(`${this.url}/year-range`);
    }

    private normalize(raw: any): PotteryItem {
        return  {
            ...raw,
            created_at: parseBackendDate(raw.created_at),
        };
    }
}
