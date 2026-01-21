import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

const TOKEN_KEY = 'access_token';


@Injectable({
    providedIn: 'root',
})
export class Auth {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    // ------------------------
    // API
    // ------------------------

    login(username: string, password: string): Observable<LoginResponse> {
        const body = new HttpParams()
            .set('username', username)
            .set('password', password);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http.post<LoginResponse>(
            `${this.apiUrl}/auth/login`,
            body.toString(),
            {headers,}
        ).pipe(
            tap((res) => {
                this.saveToken(res.access_token)
            })
        );
    }

    // ------------------------
    // Token handling
    // ------------------------

    get token(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.token;
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    private saveToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }
}
