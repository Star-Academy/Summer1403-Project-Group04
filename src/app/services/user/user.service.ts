import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  of,
  throwError,
} from 'rxjs';
import { UserData } from '../../models/user-data';
import { loginResponse } from '../../models/login-response';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = 'http://localhost:5293';
  private userDataSubject: BehaviorSubject<UserData> =
    new BehaviorSubject<UserData>({
      id: 0,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      roles: [],
    });
  public userData$: Observable<UserData> = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): void {
    const apiUrl = `${this.URL}/api/User/GetUser`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .get<UserData>(apiUrl, { headers, withCredentials: true })
      .subscribe({
        next: (response: UserData) => {
          this.userDataSubject.next(response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching user data', error);
        },
      });
  }

  async getUserById(id: number): Promise<UserData> {
    const apiUrl = `${this.URL}/api/Admin/GetUser/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let data: UserData = {
      id: 0,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      roles: [],
    };

    try {
      data = await firstValueFrom(
        this.http.get<UserData>(apiUrl, { headers, withCredentials: true })
      );
    } catch (error) {
      console.log(error);
    }

    return data;
  }

  getUsers(pageNum: number, pageSize = 10): Observable<UserData[]> {
    const apiUrl = `${this.URL}/api/Admin/GetAllUser/${pageNum}/${pageSize}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .get<UserData[]>(apiUrl, { headers, withCredentials: true })
      .pipe(catchError(() => of([])));
  }

  deleteUser(userId: number): Observable<loginResponse> {
    const apiUrl = `${this.URL}/api/Admin/DeleteUser/${userId}`;
    return this.http
      .delete<loginResponse>(apiUrl, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error deleting user', error);
          return throwError(() => new Error('Error deleting user'));
        })
      );
  }

  addUser(formGroup: FormGroup) {
    const value = formGroup.value;
    console.log(value);

    const apiUrl = `${this.URL}/api/Admin/CreateUser`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post(apiUrl, value, { headers, withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding user', error);
        },
      });
  }
}
