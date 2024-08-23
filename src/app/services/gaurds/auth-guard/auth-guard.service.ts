import { Injectable } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PermisionsService } from '../../permisisons/permisions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private permissionService: PermisionsService
  ) {}

  canActivate() {
    this.loginService.isLoggedIn().subscribe({
      next: (response: { permissions: string } | HttpErrorResponse) => {
        try {
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
              this.router.navigate(['dashboard']);
              return true;
            }
          }
          this.router.navigate(['/']);
          return false;
        } catch (error) {
          console.log(error);
          this.router.navigate(['/']);
          return false;
        }
      },
      error: () => {
        this.router.navigate(['/']);
        return false;
      },
    });
  }
}
