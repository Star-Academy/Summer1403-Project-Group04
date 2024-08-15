import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://192.168.24.180:5293/api/Auth/Login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log(this.apiUrl);
    
    const body = { username, password };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
  