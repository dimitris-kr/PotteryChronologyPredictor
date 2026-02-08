import {Injectable} from '@angular/core';
import {getApiUrl} from '../utils/request';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PotteryItem, PotteryItemBase} from '../models/pottery-item';
import {ClassificationPrediction, Prediction, RegressionPredictionResult} from '../models/prediction';
import {parseBackendDate} from '../utils/dates';

@Injectable({
    providedIn: 'root',
})
export class ApiPotteryItems {
    private readonly url = getApiUrl('pottery-items');

    constructor(private http: HttpClient) {
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

    private normalize(raw: any): PotteryItem {
        return  {
            ...raw,
            created_at: parseBackendDate(raw.created_at),
        };
    }
}
