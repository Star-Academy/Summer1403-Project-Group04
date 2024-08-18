import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginResponse } from '../../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL = 'http://192.168.24.180:5293';
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<loginResponse | HttpErrorResponse> {
    const apiUrl = `${this.URL}/api/Auth/Login`;

    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<loginResponse | HttpErrorResponse>(apiUrl, body, {
      headers,
      withCredentials: true,
    });
  }

  isLoggedIn(): Observable<string[] | HttpErrorResponse> {
    const apiUrl = `${this.URL}/api/Access/GetPermissions`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<string[]>(apiUrl, { headers, withCredentials: true });
  }
}
