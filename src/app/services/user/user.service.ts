import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, of, throwError } from 'rxjs';
import { UserData } from '../../models/user-data';
import { loginResponse } from '../../models/login-response';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';

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

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  getCurrentUser(): void {
    const apiUrl = `${this.URL}/api/User/GetUser`;
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
      data = await firstValueFrom(this.http.get<UserData>(apiUrl, { headers, withCredentials: true }));
    } catch (error) {
      console.log(error);
    }

    return data;
  }

  getUsers(pageNum: number, pageSize = 10): Observable<{ users: UserData[]; allUserCount: number }> {
    const apiUrl = `${this.URL}/api/Admin/GetAllUser?page=${pageNum}&size=${pageSize}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<{ users: UserData[]; allUserCount: number }>(apiUrl, { headers, withCredentials: true }).pipe(
      map((response) => response),
      catchError(() => of({ users: [], allUserCount: 0 }))
    );
  }

  deleteUser(userId: number): Observable<loginResponse> {
    const apiUrl = `${this.URL}/api/Admin/DeleteUser/${userId}`;
    return this.http.delete<loginResponse>(apiUrl, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error deleting user', error);
        return throwError(() => new Error('Error deleting user'));
      })
    );
  }

  addUser(formGroup: FormGroup) {
    const value = formGroup.value;

    const apiUrl = `${this.URL}/api/Admin/CreateUser`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<loginResponse>(apiUrl, value, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        if (response.message === 'User Created Successfuly!') {
          this.notificationService.createNotification('success', 'User Created Successfully', response.message);
        } else {
          this.notificationService.createNotification('error', 'Error Creating User', response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check your inputs';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }

  updateUser(id: number, formGroup: FormGroup) {
    const value = formGroup.value;

    const apiUrl = `${this.URL}/api/Admin/UpdateUser/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<loginResponse>(apiUrl, value, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        if (response.message === 'User updated successfully!') {
          this.notificationService.createNotification('success', 'User Updated Successfully', response.message);
        } else {
          this.notificationService.createNotification('error', 'Error Updating User', response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check your inputs';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }

  updateProfile(formGroup: FormGroup) {
    const value = formGroup.value;

    const apiUrl = `${this.URL}/api/User/UpdateUser`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<loginResponse>(apiUrl, value, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        if (response.message === 'User updated successfully!') {
          this.notificationService.createNotification('success', 'Profile Updated Successfully', response.message);
        } else {
          this.notificationService.createNotification('error', 'Error Updating Profile', response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check your inputs';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }

  updateUserPassword(id: number, formGroup: FormGroup) {
    const value = {'oldPassword': formGroup.get('oldpassword')?.value, 'newPassword': formGroup.get('newpassword')?.value};

    const apiUrl = `${this.URL}/api/Admin/UpdatePassword/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<loginResponse>(apiUrl, value, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        if (response.message === 'User updated successfully!') {
          this.notificationService.createNotification('success', 'User Updated Successfully', response.message);
        } else {
          this.notificationService.createNotification('error', 'Error Updating User', response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check your inputs';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }

  updateProfilePassword(formGroup: FormGroup) {
    const value = {'oldPassword': formGroup.get('oldpassword')?.value, 'newPassword': formGroup.get('newpassword')?.value};

    const apiUrl = `${this.URL}/api/User/UpdatePassword`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<loginResponse>(apiUrl, value, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        if (response.message === 'User updated successfully!') {
          this.notificationService.createNotification('success', 'Profile Updated Successfully', response.message);
        } else {
          this.notificationService.createNotification('error', 'Error Updating Profile', response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check your inputs';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }
}
