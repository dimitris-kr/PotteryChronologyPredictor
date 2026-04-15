import { Injectable } from '@angular/core';
import {getApiUrl} from '../utils/request';
import {HttpClient} from '@angular/common/http';
import {PageState} from '../models/request-params';
import {Observable} from 'rxjs';
import {PaginatedResponse} from '../models/paginated-response';
import {Task} from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiTasks {
    private readonly url = getApiUrl('tasks');

    constructor(private http: HttpClient) {
    }

    getAll(
        page: PageState
    ): Observable<PaginatedResponse<Task>> {
        return this.http.get<PaginatedResponse<Task>>(
            this.url, {params: {...page}}
        );
    }

    getAllNoPag(): Observable<Task[]> {
        return this.http.get<Task[]>(
            `${this.url}/all`
        );
    }
}
