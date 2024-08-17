import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginResponse } from '../../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://192.168.24.166:5293/api/Auth/Login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<loginResponse | HttpErrorResponse> {
    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<loginResponse | HttpErrorResponse>(this.apiUrl, body, { headers });
  }
}
