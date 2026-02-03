import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiClient {
    private readonly base = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    get<T>(path: string, query?: Record<string, any>) {
        const params = this.toParams(query);
        return this.http.get<T>(`${this.base}${path}`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    post<T>(path: string, body?: any, query?: Record<string, any>) {
        const params = this.toParams(query);
        return this.http.post<T>(`${this.base}${path}`, body ?? {}, { params }).pipe(
            catchError(this.handleError)
        );
    }

    delete<T>(path: string, query?: Record<string, any>) {
        const params = this.toParams(query);
        return this.http.delete<T>(`${this.base}${path}`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    private toParams(query?: Record<string, any>) {
        let params = new HttpParams();
        if (!query) return params;

        for (const [k, v] of Object.entries(query)) {
            if (v === undefined || v === null) continue;
            params = params.set(k, String(v));
        }
        return params;
    }

    private handleError(err: HttpErrorResponse) {
        const message =
            err.error?.message ||
            err.error?.error ||
            err.message ||
            'Something went wrong. Please try again.';
        return throwError(() => ({ status: err.status, message, raw: err }));
    }
}
