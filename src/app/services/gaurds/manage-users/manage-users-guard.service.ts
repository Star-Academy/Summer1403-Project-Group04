import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersGuardService {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.getUsers(0, 10).pipe(
      map(response => {
        if (response.length > 0) {
          return true;
        } else {
          this.router.navigate(['dashboard']);
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
        this.router.navigate(['dashboard']);
        return of(false);
      })
    );
  }
}
