import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    private apiUrl = 'http://localhost:8000/api';  // URL base da sua API Django

    constructor(private http: HttpClient) { }

    // Headers padrão (você pode adicionar mais conforme necessário)
    protected getHeaders(includeAuth: boolean = true): HttpHeaders {
        const headersConfig: any = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            headersConfig['Authorization'] = `Bearer ${localStorage.getItem('access') || ''}`;
        }

        return new HttpHeaders(headersConfig);
    }


    // Métodos base para requisições HTTP
    protected get<T>(endpoint: string, includeAuth: boolean = true): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders(includeAuth) });
    }

    protected post<T>(endpoint: string, body: any, includeAuth: boolean = true): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.getHeaders(includeAuth) });
    }

    protected put<T>(endpoint: string, body: any, includeAuth: boolean = true): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.getHeaders(includeAuth) });
    }

    protected delete<T>(endpoint: string, includeAuth: boolean = true): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders(includeAuth) });
    }

}
