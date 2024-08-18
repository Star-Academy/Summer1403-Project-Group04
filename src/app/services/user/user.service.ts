import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
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
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
      }
    });
  }

  getUsers(pageNum: number, pageSize: number = 10): Observable<UserData[]> {
    const apiUrl = `${this.URL}/api/Admin/GetAllUser/${pageNum}/${pageSize}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<UserData[]>(apiUrl, { headers, withCredentials: true }).pipe(catchError(() => of([])));;
  }

  deleteUser(userId: number): Observable<any> {
    const apiUrl = `${this.URL}/api/Admin/DeleteUser/${userId}`;
    return this.http.delete(apiUrl, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error deleting user', error);
        return throwError(() => error);
      })
    );
  }
}
