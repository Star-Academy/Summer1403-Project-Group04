import { Injectable } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PermisionsService } from '../../permisisons/permisions.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuardService {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private permissionService: PermisionsService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.loginService.isLoggedIn().pipe(
      map((response: { permissions: string } | HttpErrorResponse) => {
        if (
          typeof response === 'object' &&
          'permissions' in response &&
          typeof (response).permissions === 'string'
        ) {
          const permissionsArray = JSON.parse((response).permissions);
          if (
            Array.isArray(permissionsArray) &&
            permissionsArray.every((item) => typeof item === 'string')
          ) {
            this.permissionService.setPermissions(permissionsArray);
            this.userService.getCurrentUser();
            return true;
          }
        }
        this.router.navigate(['/']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
