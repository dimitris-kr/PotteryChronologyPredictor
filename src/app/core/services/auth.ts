import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {jwtDecode} from 'jwt-decode';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

interface JwtPayload {
    exp: number; // expiration time (seconds since epoch)
    sub?: string;
    id: number;
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

    private saveToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    /** TRUE only if token exists AND is not expired */
    isLoggedIn(): boolean {
        const token = this.token;
        if (!token) return false;

        return !this.isTokenExpired(token);
    }

    /** Decode JWT and check exp */
    isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            console.log(decoded);
            console.log(decoded.exp);
            console.log(new Date(decoded.exp * 1000));
            const now = Math.floor(Date.now() / 1000); // seconds
            console.log((decoded.exp - now) / 60)
            return decoded.exp < now;
        } catch {
            return true; // invalid token = treat as expired
        }
    }
}
