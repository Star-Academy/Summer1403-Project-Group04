import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../../models/api-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<APIResponse | HttpErrorResponse> {
    const apiUrl = `${this.URL}/api/Auth/Login`;

    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<APIResponse | HttpErrorResponse>(apiUrl, body, {
      headers,
      withCredentials: true,
    });
  }

  isLoggedIn(): Observable<{ permissions: string } | HttpErrorResponse> {
    const apiUrl = `${this.URL}/api/User/permissions`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<{ permissions: string }>(apiUrl, { headers, withCredentials: true });  
  }
}
