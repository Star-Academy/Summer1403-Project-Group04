import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { UserData } from '../../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:5293';
  private userDataSubject: BehaviorSubject<UserData> = new BehaviorSubject<UserData>({
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: []
  });
  public userData$: Observable<UserData> = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser(): void {
    const apiUrl = `${this.URL}/api/User/GetUser`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get<UserData>(apiUrl, { headers, withCredentials: true }).subscribe({
      next: (response: UserData) => {
        this.userDataSubject.next(response);
        console.log(response)
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
      }
    });
  }
}
