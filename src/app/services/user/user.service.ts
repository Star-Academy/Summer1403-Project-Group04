import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, of, throwError } from 'rxjs';
import { UserData } from '../../models/user-data';
import { loginResponse } from '../../models/login-response';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = 'http://localhost:5293';
  private userDataSubject: BehaviorSubject<UserData> = new BehaviorSubject<UserData>({
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
  });
  public userData$: Observable<UserData> = this.userDataSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUser(): void {
    const apiUrl = `${this.URL}/api/User`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get<UserData>(apiUrl, { headers, withCredentials: true }).subscribe({
      next: (response: UserData) => {
        this.userDataSubject.next(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
      },
    });
  }

  async getUserById(id: number): Promise<UserData> {
    const apiUrl = `${this.URL}/api/Admin/users/${id}`;
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
      data = await firstValueFrom(this.http.get<UserData>(apiUrl, { headers, withCredentials: true }));
    } catch (error) {
    }

    return data;
  }

  getUsers(pageNum: number, pageSize = 10): Observable<{ users: UserData[]; allUserCount: number }> {
    const apiUrl = `${this.URL}/api/Admin/users?page=${pageNum}&size=${pageSize}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<{ users: UserData[]; allUserCount: number }>(apiUrl, { headers, withCredentials: true }).pipe(
      map((response) => response),
      catchError(() => of({ users: [], allUserCount: 0 }))
    );
  }

  deleteUser(userId: number): Observable<loginResponse> {
    const apiUrl = `${this.URL}/api/Admin/users/${userId}`;
    return this.http.delete<loginResponse>(apiUrl, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error deleting user', error);
        return throwError(() => new Error('Error deleting user'));
      })
    );
  }

  addUser(formGroup: FormGroup) {
    const value = formGroup.value;

    const apiUrl = `${this.URL}/api/Admin/users`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<loginResponse>(apiUrl, value, { headers, withCredentials: true });
  }

  updateUser(id: number | null, formGroup: FormGroup, isProfile: boolean) {
    const value = formGroup.value;

    const apiUrl = isProfile ? `${this.URL}/api/User` : `${this.URL}/api/Admin/users/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<loginResponse>(apiUrl, value, { headers, withCredentials: true });
  }

  updatePassword(id: number | null, formGroup: FormGroup, isProfile: boolean) {
    const value = {
      oldPassword: formGroup.get('oldpassword')?.value,
      newPassword: formGroup.get('newpassword')?.value,
    };

    const apiUrl = isProfile ? `${this.URL}/api/User/password` : `${this.URL}/api/Admin/users/${id}/password`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.patch<loginResponse>(apiUrl, value, { headers, withCredentials: true });
  }

  updateRole(roles: string[], id: number) {
    const apiUrl = `${this.URL}/api/Admin/users/${id}/roles`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.patch<loginResponse>(apiUrl, roles, { headers, withCredentials: true });
  }

  logout() {
    const apiUrl = `${this.URL}/api/User/logout`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, { headers, withCredentials: true });
  }
}
