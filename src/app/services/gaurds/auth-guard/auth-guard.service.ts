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
      next: (response: string[] | HttpErrorResponse) => {
        if (
          Array.isArray(response) &&
          response.every((item) => typeof item === 'string')
        ) {
          this.permissionService.setPermissions(response);
           return true;
        }else{
          this.router.navigate(['/']);
          return false;
        }  
      },
      error: () => {
        return false;
      },
    });
  }
}
